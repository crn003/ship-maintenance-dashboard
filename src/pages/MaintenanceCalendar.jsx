// src/pages/MaintenanceCalendar.jsx
import React, { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

export default function MaintenanceCalendar() {
  const [jobs, setJobs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getJobsForDate = (date) =>
    jobs.filter((job) => isSameDay(new Date(job.scheduledDate), date));

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Maintenance Calendar</h1>

      <div className="grid grid-cols-7 gap-2 bg-white rounded p-4 shadow-md">
        {daysInMonth.map((day) => {
          const jobsForDay = getJobsForDate(day);
          return (
            <div
              key={day.toISOString()}
              className="border rounded p-2 cursor-pointer hover:bg-blue-50"
              onClick={() => setSelectedDate(day)}
            >
              <div className="font-semibold">{format(day, "d MMM")}</div>
              {jobsForDay.length > 0 && (
                <div className="mt-1 text-sm text-green-600">
                  {jobsForDay.length} job{jobsForDay.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-6 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">
            Jobs on {format(selectedDate, "dd MMMM yyyy")}
          </h2>
          {getJobsForDate(selectedDate).length === 0 ? (
            <p className="text-gray-500">No jobs scheduled.</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {getJobsForDate(selectedDate).map((job) => (
                <li key={job.id}>
                  <strong>{job.type}</strong> – {job.priority} –{" "}
                  <span className="text-gray-600">{job.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
