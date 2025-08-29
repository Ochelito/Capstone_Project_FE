import React from "react";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";

function Header() {
  const { user } = useAuthStore();
  const { applications } = useApplicationStore();

  const now = new Date();

  // 🔹 Compute notifications for interviews based on upcoming intervals
  const notifications = applications
    .filter((app) => app.status === "interview" && app.interviewDate)
    .map((app) => {
      const interviewTime = new Date(app.interviewDate);
      const diffMs = interviewTime - now;
      const diffMinutes = diffMs / (1000 * 60); // difference in minutes
      const diffDays = diffMinutes / (60 * 24);

      let alertType = null;

      if (diffDays <= 7 && diffDays > 3) {
        alertType = "1 week";
      } else if (diffDays <= 3 && diffMinutes > 30) {
        alertType = "3 days";
      } else if (diffMinutes <= 30 && diffMinutes > 0) {
        alertType = "30 minutes";
      }

      return alertType ? { ...app, alertType } : null;
    })
    .filter(Boolean);

  const upcomingInterviews = notifications.length;

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src="/assets/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold">Job Tracker</h1>
      </div>

      {/* Right side: notifications + profile */}
      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {upcomingInterviews > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {upcomingInterviews}
            </span>
          )}

          {/* Optional dropdown: show upcoming notifications */}
          {upcomingInterviews > 0 && (
            <div className="absolute right-0 mt-8 w-60 bg-white border rounded shadow-lg p-2 z-10">
              <h4 className="font-semibold text-sm mb-2">Upcoming Interviews</h4>
              {notifications.map((app, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1">
                  <span>{app.company || "Unknown Company"}</span>
                  <span className="text-gray-500">{app.alertType}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          {user?.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
              {/* Display first letter of username for local users */}
              {user?.username
                ? user.username[0].toUpperCase()
                : user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <span className="text-gray-700 font-medium">
            {/* Show username first, then name, then email fallback */}
            {user?.username || user?.name || user?.email?.split("@")[0] || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
