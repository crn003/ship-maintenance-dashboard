import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditShip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const shipToEdit = storedShips.find((ship) => ship.id === id);
    if (shipToEdit) setFormData(shipToEdit);
    else navigate("/ships");
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const newShips = updatedShips.map((ship) =>
      ship.id === id ? { ...formData, id } : ship
    );
    localStorage.setItem("ships", JSON.stringify(newShips));
    navigate("/ships");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Edit Ship</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-4">
          <label className="block font-semibold">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">IMO Number</label>
          <input
            name="imo"
            value={formData.imo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Flag</label>
          <input
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Ship
        </button>
      </form>
    </div>
  );
}
