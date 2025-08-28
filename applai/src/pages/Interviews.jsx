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
        return "bg-white border-l-4 border-blue-500";
      case "offer":
        return "bg-green-100 border-l-4 border-green-500";
      case "rejected":
        return "bg-red-100 border-l-4 border-red-500";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Interviews</h1>

      {sortedApps.length === 0 && <p>No upcoming interviews.</p>}

      <ul className="space-y-3">
        {sortedApps.map(app => (
          <li key={app.id} className={`p-4 rounded shadow flex justify-between items-center ${getStatusClass(app.status)}`}>
            <div>
              <p className="font-semibold">{app.position} @ {app.company}</p>

              {app.status === "interview" && app.interviewDate && (
                <p className="text-sm text-gray-500">Date: {new Date(app.interviewDate).toLocaleDateString()}</p>
              )}

              {app.status === "interview" && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  Upcoming
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {app.status === "interview" && (
                <>
                  <button
                    onClick={() => handleStatusChange(app.id, "offer")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Offer
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, "rejected")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </>
              )}

              {(app.status === "offer" || app.status === "rejected") && (
                <span className="px-3 py-1 rounded font-semibold">
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