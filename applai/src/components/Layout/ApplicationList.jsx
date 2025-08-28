import React from "react";
import useApplicationStore from "@/store/applicationStore"; // Zustand store

function ApplicationList() {
  // Grab applications from store
  const applications = useApplicationStore((state) => state.applications);

  if (!applications || applications.length === 0) {
    return (
      <div className="border-t pt-4">
        <p className="text-gray-500">No applications yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-4">
      <ul className="space-y-4">
        {applications.map((app, index) => (
          <li
            key={index}
            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{app.position}</h2>
                <p className="text-gray-600">{app.company}</p>
                <p className="text-sm text-gray-400">{app.dateApplied}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  app.status === "Applied"
                    ? "bg-blue-100 text-blue-700"
                    : app.status === "Interview"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "Offer"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationList;