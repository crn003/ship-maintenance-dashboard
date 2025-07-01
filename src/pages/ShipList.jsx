// src/pages/ShipList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ShipList() {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    setShips(storedShips);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ship?");
    if (!confirmDelete) return;

    const updatedShips = ships.filter((ship) => ship.id !== id);
    localStorage.setItem("ships", JSON.stringify(updatedShips));
    setShips(updatedShips);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Ships List</h1>

      <Link
        to="/ships/add"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Ship
      </Link>

      {ships.length === 0 ? (
        <p>No ships found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">IMO Number</th>
                <th className="px-4 py-2 text-left">Flag</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ships.map((ship) => (
                <tr key={ship.id} className="border-t">
                  <td className="px-4 py-2">{ship.name}</td>
                  <td className="px-4 py-2">{ship.imo}</td>
                  <td className="px-4 py-2">{ship.flag}</td>
                  <td className="px-4 py-2">{ship.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/ships/${ship.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/ships/edit/${ship.id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(ship.id)}
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