// src/pages/NotificationCenter.jsx
import React, { useEffect, useState } from "react";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
  }, []);

  const dismissNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Notification Center</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">No new notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800">{n.message}</p>
                <p className="text-sm text-gray-500">{new Date(n.timestamp).toLocaleString()}</p>
              </div>
              <button
                onClick={() => dismissNotification(n.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
