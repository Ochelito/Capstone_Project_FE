import React from "react";
import useApplicationStore from "@/store/applicationStore";

export default function Interviews() {
  // Access applications and update function from store
  const { applications, updateApplication } = useApplicationStore();

  // Filter applications for relevant statuses and sort them: Interview first, then Offer, then Rejected
  const sortedApps = [...applications]
    .filter(a => a.status === "Interview" || a.status === "Offer" || a.status === "Rejected")
    .sort((a, b) => {
      const order = { Interview: 0, Offer: 1, Rejected: 2 };
      return order[a.status] - order[b.status];
    });

  // Handle status change when buttons are clicked
  const handleStatusChange = (id, newStatus) => {
    updateApplication(id, { status: newStatus });
  };

  // CSS classes for the list item background based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "Interview":
        return "bg-purple-50 border-l-4 border-purple-400";
      case "Offer":
        return "bg-purple-100 border-l-4 border-purple-500";
      case "Rejected":
        return "bg-purple-200 border-l-4 border-purple-600";
      default:
        return "bg-purple-50";
    }
  };

  // CSS classes for the status badge
  const getBadgeClass = (status) => {
    switch (status) {
      case "Interview":
        return "text-purple-800 bg-purple-200";
      case "Offer":
        return "text-purple-900 bg-purple-300";
      case "Rejected":
        return "text-purple-700 bg-purple-100";
      default:
        return "text-black bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-4 bg-white min-h-screen">
      {/* Page header */}
      <h1 className="text-2xl font-bold text-black">Interviews</h1>

      {/* Message when no applications are present */}
      {sortedApps.length === 0 && <p className="text-gray-600">No upcoming interviews.</p>}

      {/* List of applications */}
      <ul className="space-y-3">
        {sortedApps.map(app => {
          // Parse interview date and time
          const date = app.interviewDate ? new Date(app.interviewDate) : null;
          const time = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

          return (
            <li
              key={app.id}
              className={`p-4 rounded-xl shadow hover:shadow-lg flex justify-between items-center transition ${getStatusClass(app.status)}`}
            >
              {/* Application details */}
              <div>
                <p className="font-semibold text-black">{app.position} @ {app.company}</p>

                {/* Show interview details if status is Interview */}
                {app.status === "Interview" && date && (
                  <>
                    <p className="text-sm text-gray-600">Date: {date.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Time: {time}</p>
                    {app.interviewLocation && (
                      <p className="text-sm text-gray-600">Location: {app.interviewLocation}</p>
                    )}
                  </>
                )}

                {/* Status badge */}
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getBadgeClass(app.status)}`}>
                  {app.status === "Interview" ? "Upcoming" : app.status.toUpperCase()}
                </span>
              </div>

              {/* Action buttons for Interview applications */}
              <div className="flex gap-2">
                {app.status === "Interview" && (
                  <>
                    {/* Mark as Offer */}
                    <button
                      onClick={() => handleStatusChange(app.id, "Offer")}
                      className="px-3 py-1 bg-purple-300 text-black rounded hover:bg-purple-400 transition"
                    >
                      Offer
                    </button>
                    {/* Mark as Rejected */}
                    <button
                      onClick={() => handleStatusChange(app.id, "Rejected")}
                      className="px-3 py-1 bg-purple-200 text-black rounded hover:bg-purple-300 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}