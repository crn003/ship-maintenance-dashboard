
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import AdminPage from "../pages/AdminPage";
import InspectorPage from "../pages/InspectorPage";
import EngineerPage from "../pages/EngineerPage";
import ShipList from "../pages/ShipList";
import ShipDetail from "../pages/ShipDetail";
import ComponentList from "../pages/ComponentList";
import JobList from "../pages/JobList";
import Calendar from "../pages/MaintenanceCalendar";
import Notifications from "../pages/NotificationCenter";
import KPIs from "../pages/KPIDashboard";

import ProtectedRoute from "./ProtectedRoute"; // ✅ Use external file

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspector"
          element={
            <ProtectedRoute allowedRoles={["Inspector"]}>
              <InspectorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engineer"
          element={
            <ProtectedRoute allowedRoles={["Engineer"]}>
              <EngineerPage />
            </ProtectedRoute>
          }
        />

        {/* Shared Pages */}
        <Route
          path="/ships"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <ShipList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ships/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <ShipDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/components"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <ComponentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kpis"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
              <KPIs />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
