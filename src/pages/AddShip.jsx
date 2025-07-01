import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddShip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShip = { id: uuidv4(), ...formData };
    const existing = JSON.parse(localStorage.getItem("ships")) || [];
    localStorage.setItem("ships", JSON.stringify([...existing, newShip]));
    navigate("/ships");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Add New Ship</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded max-w-xl space-y-4"
      >
        <div>
          <label className="block font-medium">Ship Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">IMO Number</label>
          <input
            type="text"
            name="imo"
            value={formData.imo}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Flag</label>
          <input
            type="text"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Ship
        </button>
      </form>
    </div>
  );
}
