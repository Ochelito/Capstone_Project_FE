import React from "react";
import useAuthStore from "@/store/useAuthStore";
import useApplicationStore from "@/store/applicationStore";

function Header() {
  const { user } = useAuthStore();
  const { applications } = useApplicationStore();

  // Count upcoming interviews for notification bell
  const upcomingInterviews = applications.filter(
    (app) =>
      app.status === "interview" &&
      app.interviewDate &&
      new Date(app.interviewDate) >= new Date()
  ).length;

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
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
          )}
          <span className="text-gray-700 font-medium">{user?.email?.split("@")[0]}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;