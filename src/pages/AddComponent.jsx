import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddComponent() {
  const [component, setComponent] = useState({
    name: "",
    shipId: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });

  const [ships, setShips] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    setShips(storedShips);

    if (id) {
      const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
      const found = storedComponents.find((c) => c.id === id);
      if (found) {
        setComponent(found);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setComponent({ ...component, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];

    if (id) {
      // Edit mode
      const updated = storedComponents.map((c) =>
        c.id === id ? component : c
      );
      localStorage.setItem("components", JSON.stringify(updated));
    } else {
      // Add mode
      const newComponent = { ...component, id: Date.now().toString() };
      storedComponents.push(newComponent);
      localStorage.setItem("components", JSON.stringify(storedComponents));
    }

    navigate("/components");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        {id ? "Edit Component" : "Add New Component"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Component Name:</label>
          <input
            type="text"
            name="name"
            value={component.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Linked Ship:</label>
          <select
            name="shipId"
            value={component.shipId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Ship</option>
            {ships.map((ship) => (
              <option key={ship.id} value={ship.id}>
                {ship.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Serial Number:</label>
          <input
            type="text"
            name="serialNumber"
            value={component.serialNumber}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Installation Date:</label>
          <input
            type="date"
            name="installDate"
            value={component.installDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Last Maintenance Date:</label>
          <input
            type="date"
            name="lastMaintenanceDate"
            value={component.lastMaintenanceDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {id ? "Update Component" : "Add Component"}
        </button>
      </form>
    </div>
  );
}
