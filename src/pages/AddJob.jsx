// src/pages/AddJob.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    componentId: "",
    shipId: "",
    type: "",
    priority: "",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setShips(storedShips);
    setComponents(storedComponents);
    setUsers(storedUsers.filter((u) => u.role === "Engineer"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addNotification = (message) => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    const newNotification = {
      id: uuidv4(),
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updated = [newNotification, ...stored];
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: uuidv4(),
      ...form,
    };

    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    localStorage.setItem("jobs", JSON.stringify([...storedJobs, newJob]));

    // 📣 Create a readable notification message
    const ship = ships.find((s) => s.id === form.shipId);
    const component = components.find((c) => c.id === form.componentId);

    addNotification(`New "${form.type}" job created for ${component?.name} on ${ship?.name}.`);

    navigate("/jobs");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Maintenance Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ship Selection */}
        <select
          name="shipId"
          value={form.shipId}
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

        {/* Component Selection */}
        <select
          name="componentId"
          value={form.componentId}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Component</option>
          {components
            .filter((c) => c.shipId === form.shipId)
            .map((component) => (
              <option key={component.id} value={component.id}>
                {component.name}
              </option>
            ))}
        </select>

        {/* Job Type */}
        <input
          type="text"
          name="type"
          placeholder="Job Type (e.g., Inspection)"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Assigned Engineer */}
        <select
          name="assignedEngineerId"
          value={form.assignedEngineerId}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Assign Engineer</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>

        {/* Scheduled Date */}
        <input
          type="date"
          name="scheduledDate"
          value={form.scheduledDate}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
