// src/pages/KPIDashboard.jsx
import React, { useEffect, useState } from "react";

export default function KPIDashboard() {
  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setShips(JSON.parse(localStorage.getItem("ships")) || []);
    setComponents(JSON.parse(localStorage.getItem("components")) || []);
    setJobs(JSON.parse(localStorage.getItem("jobs")) || []);
  }, []);

  const jobsInProgress = jobs.filter((job) => job.status === "Open").length;
  const jobsCompleted = jobs.filter((job) => job.status === "Completed").length;

  const overdueComponents = components.filter((comp) => {
    const lastMaintenance = new Date(comp.lastMaintenanceDate);
    const today = new Date();
    return lastMaintenance < today.setMonth(today.getMonth() - 6); // older than 6 months
  }).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">KPIs Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Total Ships</h2>
          <p className="text-3xl mt-2 text-blue-600">{ships.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Total Components</h2>
          <p className="text-3xl mt-2 text-blue-600">{components.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Jobs in Progress</h2>
          <p className="text-3xl mt-2 text-yellow-500">{jobsInProgress}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Jobs Completed</h2>
          <p className="text-3xl mt-2 text-green-600">{jobsCompleted}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800">Overdue Components</h2>
          <p className="text-3xl mt-2 text-red-600">{overdueComponents}</p>
        </div>
      </div>
    </div>
  );
}
