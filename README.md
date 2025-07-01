README.md (Full Professional Version)

# 🛳️ ENTNT Ship Maintenance Dashboard

A full-featured **Ship Maintenance Dashboard** built using **React**, **Tailwind CSS**, and **localStorage** — designed for Admins, Inspectors, and Engineers to manage ships, components, jobs, maintenance calendars, notifications, and performance KPIs.

---

## 📌 Features

- 🔐 **Login Authentication**
  - Hardcoded user roles: Admin, Inspector, Engineer
  - Session persistence with `localStorage`
  - Role-based access & redirection
- 🚢 **Ship Management**
  - List, Add, Edit, Delete Ships
  - Ship Detail View with component list
- 🔧 **Component Management**
  - View Components by Ship
  - Add, Edit, Delete Components
- 📋 **Job Management**
  - Add, Edit, View Jobs
  - Filter by status, ship, component
- 🗓️ **Maintenance Calendar**
  - Visual calendar of scheduled jobs
- 🔔 **Notification Center**
  - Auto-generated notifications (e.g., job created)
- 📊 **KPIs Dashboard**
  - Count of Ships, Components, Jobs (Open/Closed)
- 🔐 **Protected Routes**
  - Access control using React Router + AuthContext
- 🎨 **Responsive Design**
  - Styled with Tailwind CSS
  - Works on desktop, tablet, mobile

---

## 🧑‍💻 Tech Stack

| Tech               | Usage                         |
|--------------------|-------------------------------|
| React              | UI Components and Routing     |
| React Router DOM   | Page routing and redirects    |
| Tailwind CSS       | Utility-first styling         |
| LocalStorage       | Frontend state persistence    |
| Vite               | Build & development server    |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ship-maintenance-dashboard.git
cd ship-maintenance-dashboard
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run Locally
bash
Copy
Edit
npm run dev
🧪 Test Logins
Role	Email	Password
Admin	admin@entnt.in	admin123
Inspector	inspector@entnt.in	inspect123
Engineer	engineer@entnt.in	engine123

🗂️ Project Structure
bash
Copy
Edit
src/
│
├── context/              # Auth context
│   └── AuthContext.jsx
│
├── data/                 # Mocked data
│   └── mockData.js
│
├── pages/                # Main page components
│   ├── Login.jsx
│   ├── AdminPage.jsx
│   ├── ShipList.jsx
│   ├── AddShip.jsx
│   ├── ComponentList.jsx
│   ├── AddComponent.jsx
│   ├── JobList.jsx
│   ├── AddJob.jsx
│   ├── MaintenanceCalendar.jsx
│   ├── NotificationCenter.jsx
│   └── KPIDashboard.jsx
│
├── router/
│   └── AppRoutes.jsx     # All protected routes
│
└── main.jsx              # App entry with AuthProvider
