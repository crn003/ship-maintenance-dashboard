🚢 Ship Maintenance Dashboard – ENTNT

Overview
A modern, role-based web application for managing ship maintenance operations efficiently. Built using React.js, Vite, and Tailwind CSS, this dashboard enables Admins, Engineers, and Inspectors to track ships, components, and maintenance jobs, view KPIs, receive notifications, and manage work via a protected authentication system.

🔧 Tech Stack

React.js (via Vite)

Tailwind CSS

React Router DOM

LocalStorage (mock backend)

date-fns (calendar operations)

Git & GitHub (version control & collaboration)

📸 Screenshots

Add screenshots or gifs here (optional but recommended)

📂 Features

✅ User Authentication

Role-based login (Admin, Engineer, Inspector)

Redirect based on role

Protected routes (via React Router)

✅ Ship Management

Add, edit, and delete ships

View detailed ship info

Assign components and maintenance jobs to ships

✅ Component Tracking

View all ship components

Add/edit components with metadata

✅ Maintenance Jobs

Track scheduled and completed jobs

Filter by status, ship, or component

Assign job types and engineers

✅ Notifications

Local notification center for tracking actions

Stored in localStorage for persistent UX

✅ Calendar View

Monthly maintenance calendar using date-fns

Color-coded events for maintenance

✅ KPI Dashboard

Overview of ship count, job status, component stats

Auto-updated from data store

🛡️ Protected Routes

Based on user role

Unauthorized access redirects to login

🚀 Deployment

Deployed via GitHub Pages (or any static host).
Live link (if deployed): https://crn003.github.io/ship-maintenance-dashboard

To deploy (optional instructions):
npm install --save-dev gh-pages

In package.json:
"homepage": "https://crn003.github.io/ship-maintenance-dashboard"

Add scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

Then run:
npm run deploy

📁 Folder Structure

src/
├── context/ # Auth context provider
├── data/ # Mock data
├── pages/ # All pages (ShipList, Jobs, Login, etc.)
├── router/ # Routes and ProtectedRoute wrapper
├── utils/ # Reusable helpers (e.g., notifications)
├── main.jsx # Entry point
├── index.css # Global styles

🧪 How to Run Locally

Clone the repo
git clone https://github.com/crn003/ship-maintenance-dashboard.git

Navigate to folder
cd ship-maintenance-dashboard

Install dependencies
npm install

Run the app
npm run dev

🧑‍💼 Roles

👩‍💼 Admin

Full control over ships, jobs, components, and users

👨‍🔧 Engineer

Access to view and update jobs assigned

🕵️ Inspector

Can create jobs, inspect statuses, add observations

📩 Contact

Developed by: crn003
Email: hr@entnt.in
GitHub: https://github.com/crn003
