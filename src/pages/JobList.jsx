import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [engineers, setEngineers] = useState([]);

  // Filters
  const [filterShip, setFilterShip] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setJobs(storedJobs);
    setShips(storedShips);
    setComponents(storedComponents);
    setEngineers(storedUsers.filter((u) => u.role === "Engineer"));
  }, []);

  const getShipName = (shipId) =>
    ships.find((s) => s.id === shipId)?.name || "Unknown";

  const getComponentName = (componentId) =>
    components.find((c) => c.id === componentId)?.name || "Unknown";

  const getEngineerName = (engineerId) =>
    engineers.find((e) => e.id === engineerId)?.email || "Unassigned";

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filterShip || job.shipId === filterShip) &&
      (!filterStatus || job.status === filterStatus) &&
      (!filterPriority || job.priority === filterPriority)
    );
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Maintenance Jobs</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={filterShip}
          onChange={(e) => setFilterShip(e.target.value)}
        >
          <option value="">Filter by Ship</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <Link
          to="/jobs/add"
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Job
        </Link>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs match the selected filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left">Ship</th>
                <th className="px-4 py-2 text-left">Component</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Engineer</th>
                <th className="px-4 py-2 text-left">Scheduled</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="px-4 py-2">{getShipName(job.shipId)}</td>
                  <td className="px-4 py-2">{getComponentName(job.componentId)}</td>
                  <td className="px-4 py-2">{job.type}</td>
                  <td className="px-4 py-2">{job.priority}</td>
                  <td className="px-4 py-2">{job.status}</td>
                  <td className="px-4 py-2">{getEngineerName(job.assignedEngineerId)}</td>
                  <td className="px-4 py-2">{job.scheduledDate}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/jobs/edit/${job.id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>
                    {/* Optional Delete Button */}
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