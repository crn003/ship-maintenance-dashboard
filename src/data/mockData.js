const mockData = {
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
    { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" }
  ],
  ships: [
    { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
    { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
  ],
  components: [
    {
      id: "c1",
      shipId: "s1",
      name: "Main Engine",
      serialNumber: "ME-1234",
      installDate: "2020-01-10",
      lastMaintenanceDate: "2024-03-12"
    },
    {
      id: "c2",
      shipId: "s2",
      name: "Radar",
      serialNumber: "RAD-5678",
      installDate: "2021-07-18",
      lastMaintenanceDate: "2023-12-01"
    }
  ],
  jobs: [
    {
      id: "j1",
      componentId: "c1",
      shipId: "s1",
      type: "Inspection",
      priority: "High",
      status: "Open",
      assignedEngineerId: "3",
      scheduledDate: "2025-05-05"
    }
  ]
};

export default mockData;
