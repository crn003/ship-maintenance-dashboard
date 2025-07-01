import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shipId: "",
    componentId: "",
    type: "",
    priority: "",
    status: "",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const job = storedJobs.find((j) => j.id === jobId);
    if (job) setForm(job);

    setShips(storedShips);
    setComponents(storedComponents);
    setEngineers(storedUsers.filter((u) => u.role === "Engineer"));
  }, [jobId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = storedJobs.map((job) =>
      job.id === jobId ? { ...job, ...form } : job
    );

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    // Optional: Add notification
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({
      id: jobId,
      type: "Job Updated",
      message: `Job ${form.type} updated successfully.`,
      timestamp: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem("notifications", JSON.stringify(notifications));

    navigate("/jobs");
  };

  if (!form.id) return <p className="p-4">Job not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Maintenance Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Job Type */}
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Job Type"
          required
        />

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Engineer Assignment */}
        <select
          name="assignedEngineerId"
          value={form.assignedEngineerId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Assign Engineer</option>
          {engineers.map((eng) => (
            <option key={eng.id} value={eng.id}>
              {eng.email}
            </option>
          ))}
        </select>

        {/* Scheduled Date */}
        <input
          type="date"
          name="scheduledDate"
          value={form.scheduledDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Update Job
        </button>
      </form>
    </div>
  );
}