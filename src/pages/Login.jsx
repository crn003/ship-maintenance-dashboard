import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css"; // ✅ optional: remove if not using CSS Modules

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(form.email, form.password);

    if (!user) {
      setError("Invalid email or password");
    } else {
      // 🔁 Role-based redirect
      if (user.role === "Admin") navigate("/admin");
      else if (user.role === "Inspector") navigate("/inspector");
      else if (user.role === "Engineer") navigate("/engineer");
    }
  };

  return (
    <div className={styles?.container || "min-h-screen flex flex-col items-center justify-center bg-gray-100"}>
      <div className={styles?.emoji || "text-5xl mb-4"}>🛳️</div>
      <h1 className={styles?.title || "text-2xl font-bold mb-4"}>
        ENTNT Ship Maintenance Dashboard
      </h1>

      <form onSubmit={handleSubmit} className={styles?.form || "w-full max-w-sm space-y-4"}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={styles?.input || "w-full px-4 py-2 border rounded"}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={styles?.input || "w-full px-4 py-2 border rounded"}
          required
        />
        {error && <p className={styles?.error || "text-red-600"}>{error}</p>}
        <button
          type="submit"
          className={styles?.button || "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
