import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditComponent = () => {
  const { shipId, componentId } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: ""
  });

  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const existingComponent = storedComponents.find(
      (c) => c.id === componentId && c.shipId === shipId
    );

    if (existingComponent) {
      setComponent(existingComponent);
      setForm({
        name: existingComponent.name,
        serialNumber: existingComponent.serialNumber,
        installDate: existingComponent.installDate,
        lastMaintenanceDate: existingComponent.lastMaintenanceDate
      });
    }
  }, [shipId, componentId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const updatedComponents = storedComponents.map((c) =>
      c.id === componentId ? { ...c, ...form } : c
    );
    localStorage.setItem("components", JSON.stringify(updatedComponents));
    navigate("/components");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this component?");
    if (!confirmDelete) return;

    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const filtered = storedComponents.filter((c) => c.id !== componentId);
    localStorage.setItem("components", JSON.stringify(filtered));
    navigate("/components");
  };

  if (!component) return <div className="p-4">Component not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Edit Component</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Component Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="serialNumber"
          placeholder="Serial Number"
          value={form.serialNumber}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="date"
          name="installDate"
          value={form.installDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="date"
          name="lastMaintenanceDate"
          value={form.lastMaintenanceDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Component
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Component
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
