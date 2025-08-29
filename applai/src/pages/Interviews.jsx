import React from "react";
import useApplicationStore from "@/store/applicationStore";

export default function Interviews() {
  const { applications, updateApplication } = useApplicationStore();

  // Filter and sort applications by status
  const sortedApps = [...applications]
    .filter(a => a.status === "interview" || a.status === "offer" || a.status === "rejected")
    .sort((a, b) => {
      const order = { interview: 0, offer: 1, rejected: 2 };
      return order[a.status] - order[b.status];
    });

  const handleStatusChange = (id, newStatus) => {
    updateApplication(id, { status: newStatus });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "interview":
        return "bg-purple-50 border-l-4 border-purple-400";
      case "offer":
        return "bg-purple-100 border-l-4 border-purple-500";
      case "rejected":
        return "bg-purple-200 border-l-4 border-purple-600";
      default:
        return "bg-purple-50";
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "interview":
        return "text-purple-800 bg-purple-200";
      case "offer":
        return "text-purple-900 bg-purple-300";
      case "rejected":
        return "text-purple-700 bg-purple-100";
      default:
        return "text-black bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black">Interviews</h1>

      {sortedApps.length === 0 && <p className="text-gray-600">No upcoming interviews.</p>}

      <ul className="space-y-3">
        {sortedApps.map(app => (
          <li
            key={app.id}
            className={`p-4 rounded-xl shadow hover:shadow-lg flex justify-between items-center transition ${getStatusClass(app.status)}`}
          >
            <div>
              <p className="font-semibold text-black">{app.position} @ {app.company}</p>

              {app.status === "interview" && app.interviewDate && (
                <p className="text-sm text-gray-600">Date: {new Date(app.interviewDate).toLocaleDateString()}</p>
              )}

              {app.status === "interview" && (
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getBadgeClass(app.status)}`}>
                  Upcoming
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {app.status === "interview" && (
                <>
                  <button
                    onClick={() => handleStatusChange(app.id, "offer")}
                    className="px-3 py-1 bg-purple-300 text-black rounded hover:bg-purple-400 transition"
                  >
                    Offer
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, "rejected")}
                    className="px-3 py-1 bg-purple-200 text-black rounded hover:bg-purple-300 transition"
                  >
                    Reject
                  </button>
                </>
              )}

              {(app.status === "offer" || app.status === "rejected") && (
                <span className={`px-3 py-1 rounded font-semibold ${getBadgeClass(app.status)}`}>
                  {app.status.toUpperCase()}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}