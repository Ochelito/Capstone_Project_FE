import React from "react";
import useApplicationStore from "@/store/applicationStore";

export default function Interviews() {
  const { applications, updateApplication } = useApplicationStore();

  const sortedApps = [...applications]
    .filter(a => a.status === "Interview" || a.status === "Offer" || a.status === "Rejected")
    .sort((a, b) => {
      const order = { Interview: 0, Offer: 1, Rejected: 2 };
      return order[a.status] - order[b.status];
    });

  const handleStatusChange = (id, newStatus) => {
    updateApplication(id, { status: newStatus });
  };

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
      <h1 className="text-2xl font-bold text-black">Interviews</h1>

      {sortedApps.length === 0 && <p className="text-gray-600">No upcoming interviews.</p>}

      <ul className="space-y-3">
        {sortedApps.map(app => {
          const date = app.interviewDate ? new Date(app.interviewDate) : null;
          const time = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

          return (
            <li
              key={app.id}
              className={`p-4 rounded-xl shadow hover:shadow-lg flex justify-between items-center transition ${getStatusClass(app.status)}`}
            >
              <div>
                <p className="font-semibold text-black">{app.position} @ {app.company}</p>

                {app.status === "Interview" && date && (
                  <>
                    <p className="text-sm text-gray-600">Date: {date.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Time: {time}</p>
                    {app.interviewLocation && (
                      <p className="text-sm text-gray-600">Location: {app.interviewLocation}</p>
                    )}
                  </>
                )}

                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getBadgeClass(app.status)}`}>
                  {app.status === "Interview" ? "Upcoming" : app.status.toUpperCase()}
                </span>
              </div>

              <div className="flex gap-2">
                {app.status === "Interview" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(app.id, "Offer")}
                      className="px-3 py-1 bg-purple-300 text-black rounded hover:bg-purple-400 transition"
                    >
                      Offer
                    </button>
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