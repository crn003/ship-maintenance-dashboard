import mockData from "../data/mockData";

export function initLocalStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockData.users));
    localStorage.setItem("ships", JSON.stringify(mockData.ships));
    localStorage.setItem("components", JSON.stringify(mockData.components));
    localStorage.setItem("jobs", JSON.stringify(mockData.jobs));
  }
}
export const addNotification = (message) => {
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  const newNotification = {
    id: Date.now().toString(),
    message,
    timestamp: new Date().toISOString(),
  };
  notifications.push(newNotification);
  localStorage.setItem("notifications", JSON.stringify(notifications));
};
