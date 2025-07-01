import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ComponentList() {
  const [components, setComponents] = useState([]);
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    setComponents(storedComponents);
    setShips(storedShips);
  }, []);

  const getShipName = (shipId) => {
    const ship = ships.find((s) => s.id === shipId);
    return ship ? ship.name : "Unknown Ship";
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this component?");
    if (!confirmDelete) return;

    const updated = components.filter((comp) => comp.id !== id);
    localStorage.setItem("components", JSON.stringify(updated));
    setComponents(updated);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Component List</h1>

      <Link
        to="/components/add"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Component
      </Link>

      {components.length === 0 ? (
        <p>No components found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left">Component Name</th>
                <th className="px-4 py-2 text-left">Ship</th>
                <th className="px-4 py-2 text-left">Serial Number</th>
                <th className="px-4 py-2 text-left">Install Date</th>
                <th className="px-4 py-2 text-left">Last Maintenance</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map((comp) => (
                <tr key={comp.id} className="border-t">
                  <td className="px-4 py-2">{comp.name}</td>
                  <td className="px-4 py-2">{getShipName(comp.shipId)}</td>
                  <td className="px-4 py-2">{comp.serialNumber}</td>
                  <td className="px-4 py-2">{comp.installDate}</td>
                  <td className="px-4 py-2">{comp.lastMaintenanceDate}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/components/edit/${comp.id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(comp.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
