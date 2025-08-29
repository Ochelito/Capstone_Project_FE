import React, { useState } from "react";
import useApplicationStore from "@/store/applicationStore"; // Zustand store

function ApplicationList() {
  const applications = useApplicationStore((state) => state.applications);
  const updateApplication = useApplicationStore((state) => state.updateApplication);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    status: "",
    interviewDate: "",
    interviewTime: "",
    interviewLocation: "",
    dateApplied: "",
    salary: "",
    industry: "",
    employmentType: "",
    workLocation: "",
    fit: "",
    notes: ""
  });

  if (!applications || applications.length === 0) {
    return (
      <div className="border-t pt-4">
        <p className="text-gray-500">No applications yet. Add one to get started!</p>
      </div>
    );
  }

  const handleEditClick = (index, app) => {
    setEditingIndex(index);
    setEditData({
      status: app.status,
      interviewDate: app.interviewDate ? new Date(app.interviewDate).toISOString().split("T")[0] : "",
      interviewTime: app.interviewTime || "",
      interviewLocation: app.interviewLocation || "",
      dateApplied: app.dateApplied || "",
      salary: app.salary || "",
      industry: app.industry || "",
      employmentType: app.employmentType || "",
      workLocation: app.workLocation || "",
      fit: app.fit || "",
      notes: app.notes || ""
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (appId) => {
    // Validation if status is interview
    if (editData.status === "Interview") {
      if (!editData.interviewDate || !editData.interviewTime || !editData.interviewLocation) {
        alert("For interviews, date, time, and location are required.");
        return;
      }
    }

    updateApplication(appId, { 
      status: editData.status, 
      interviewDate: editData.status === "Interview" ? `${editData.interviewDate}T${editData.interviewTime}` : null,
      interviewTime: editData.status === "Interview" ? editData.interviewTime : null,
      interviewLocation: editData.status === "Interview" ? editData.interviewLocation : null,
      dateApplied: editData.dateApplied,
      salary: editData.salary,
      industry: editData.industry,
      employmentType: editData.employmentType,
      workLocation: editData.workLocation,
      fit: editData.fit,
      notes: editData.notes
    });

    setEditingIndex(null);
  };

  return (
    <div className="border-t pt-4">
      <ul className="space-y-4">
        {applications.map((app, index) => (
          <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-1">
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="company"
                      value={editData.company || app.company}
                      onChange={handleChange}
                      placeholder="Company"
                      className="border rounded px-2 py-1 w-full"
                    />
                    <input
                      type="text"
                      name="position"
                      value={editData.position || app.position}
                      onChange={handleChange}
                      placeholder="Position"
                      className="border rounded px-2 py-1 w-full"
                    />
                    <input
                      type="date"
                      name="dateApplied"
                      value={editData.dateApplied}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <input
                      type="text"
                      name="salary"
                      value={editData.salary}
                      onChange={handleChange}
                      placeholder="Salary"
                      className="border rounded px-2 py-1 w-full"
                    />
                    <input
                      type="text"
                      name="industry"
                      value={editData.industry}
                      onChange={handleChange}
                      placeholder="Industry"
                      className="border rounded px-2 py-1 w-full"
                    />
                    <select
                      name="employmentType"
                      value={editData.employmentType}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <select
                      name="workLocation"
                      value={editData.workLocation}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select Work Type</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                    <input
                      type="text"
                      name="fit"
                      value={editData.fit}
                      onChange={handleChange}
                      placeholder="How your profile fits"
                      className="border rounded px-2 py-1 w-full"
                    />
                    <textarea
                      name="notes"
                      value={editData.notes}
                      onChange={handleChange}
                      placeholder="Notes"
                      className="border rounded px-2 py-1 w-full"
                    />
                    {/* Interview fields */}
                    {editData.status === "Interview" && (
                      <>
                        <input
                          type="date"
                          name="interviewDate"
                          value={editData.interviewDate}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                        <input
                          type="time"
                          name="interviewTime"
                          value={editData.interviewTime}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                        <input
                          type="text"
                          name="interviewLocation"
                          value={editData.interviewLocation}
                          onChange={handleChange}
                          placeholder="Interview Location"
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold">{app.position}</h2>
                    <p className="text-gray-600">{app.company}</p>
                    <p className="text-sm text-gray-400">Applied: {app.dateApplied}</p>
                    <p className="text-sm text-gray-400">Salary: {app.salary}</p>
                    <p className="text-sm text-gray-400">Industry: {app.industry}</p>
                    <p className="text-sm text-gray-400">Employment: {app.employmentType}</p>
                    <p className="text-sm text-gray-400">Work: {app.workLocation}</p>
                    <p className="text-sm text-gray-400">Fit: {app.fit}</p>
                    <p className="text-sm text-gray-400">Notes: {app.notes}</p>
                    {app.status === "Interview" && app.interviewDate && (
                      <p className="text-sm text-gray-500">Interview: {new Date(app.interviewDate).toLocaleString()} @ {app.interviewLocation}</p>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Status / Edit */}
                {editingIndex === index ? (
                  <div className="flex flex-col gap-2">
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      className="px-3 py-1 text-sm rounded-full border"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(app.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
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
                    <button
                      onClick={() => handleEditClick(index, app)}
                      className="ml-2 text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationList;
