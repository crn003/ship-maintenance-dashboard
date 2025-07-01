// src/pages/ShipDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ShipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);
  const [components, setComponents] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const ships = JSON.parse(localStorage.getItem("ships")) || [];
    const selectedShip = ships.find((s) => s.id === id);
    if (!selectedShip) {
      navigate("/ships");
      return;
    }
    setShip(selectedShip);

    const allComponents = JSON.parse(localStorage.getItem("components")) || [];
    const shipComponents = allComponents.filter((c) => c.shipId === id);
    setComponents(shipComponents);

    const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const shipJobs = allJobs.filter((j) => j.shipId === id);
    setJobs(shipJobs);
  }, [id, navigate]);

  if (!ship) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {ship.name} - Details
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          General Information
        </h2>
        <p><strong>IMO Number:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Components Installed
        </h2>
        {components.length === 0 ? (
          <p>No components found.</p>
        ) : (
          <ul className="list-disc list-inside">
            {components.map((c) => (
              <li key={c.id}>
                {c.name} (Serial: {c.serialNumber}) – Last Maintenance: {c.lastMaintenanceDate}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Maintenance History
        </h2>
        {jobs.length === 0 ? (
          <p>No maintenance jobs found.</p>
        ) : (
          <ul className="list-disc list-inside">
            {jobs.map((j) => (
              <li key={j.id}>
                {j.type} - {j.status} - Priority: {j.priority} (Scheduled: {j.scheduledDate})
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        to="/ships"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        ← Back to Ships List
      </Link>
    </div>
  );
}
