import React from "react"; 
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import light from "@/assets/light.png";

function Header() {
  const { user } = useAuthStore();
  const displayName = useAuthStore((state) => state.displayName);
  const userInitials = useAuthStore((state) => state.userInitials);
  const { applications } = useApplicationStore();

  const now = new Date();

  const notifications = applications
    .filter((app) => app.status === "Interview" && app.interviewDate)
    .map((app) => {
      const interviewTime = new Date(app.interviewDate);
      const diffMs = interviewTime - now;
      const diffMinutes = diffMs / (1000 * 60);
      const diffDays = diffMinutes / (60 * 24);

      let alertType = null;
      if (diffDays <= 7 && diffDays > 3) alertType = "1 week";
      else if (diffDays <= 3 && diffMinutes > 30) alertType = "3 days";
      else if (diffMinutes <= 30 && diffMinutes > 0) alertType = "30 min";

      return alertType ? { ...app, alertType } : null;
    })
    .filter(Boolean);

  const upcomingInterviews = notifications.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
        <img src={light} alt="Logo" className="h-7 w-28 sm:w-auto" />

        {/* Job Tracker text hidden on small screens */}
        <h1 className="hidden sm:block text-xl font-bold text-black">
          Job Tracker
        </h1>
      </div>

      {/* Right side: notifications + profile */}
      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        {/* Notification bell */}
        <div className="relative cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
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
            <span className="absolute -top-1 -right-1 bg-purple-300 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {upcomingInterviews}
            </span>
          )}

          {/* Dropdown */}
          {upcomingInterviews > 0 && (
            <div className="absolute right-0 mt-8 w-60 bg-white border rounded shadow-lg p-2 hidden group-hover:block z-10">
              <h4 className="font-semibold text-sm mb-2 text-black">
                Upcoming Interviews
              </h4>
              {notifications.map((app, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1 text-black">
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
              className="h-8 w-8 rounded-full object-cover border-2 border-purple-100"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-black font-bold">
              {userInitials}
            </div>
          )}
          <span className="hidden sm:block text-black font-medium">{displayName || "User"}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;