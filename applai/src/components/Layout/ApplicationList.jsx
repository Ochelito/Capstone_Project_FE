import React, { useState } from "react";
import useApplicationStore from "@/store/applicationStore";

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
      <div className="pt-4">
        <p className="text-gray-500 text-center">No applications yet. Add one to get started!</p>
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

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleSave = (appId) => {
    if (editData.status === "Interview" && (!editData.interviewDate || !editData.interviewTime || !editData.interviewLocation)) {
      alert("For interviews, date, time, and location are required.");
      return;
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
    <div className="pt-4">
      <ul className="space-y-4">
        {applications.map((app, index) => (
          <li key={index} className="p-4 bg-purple-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-1">
                {editingIndex === index ? (
                  <>
                    <input type="text" name="company" value={editData.company || app.company} onChange={handleChange} placeholder="Company" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    <input type="text" name="position" value={editData.position || app.position} onChange={handleChange} placeholder="Position" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    <input type="date" name="dateApplied" value={editData.dateApplied} onChange={handleChange} className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    <input type="text" name="salary" value={editData.salary} onChange={handleChange} placeholder="Salary" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    <input type="text" name="industry" value={editData.industry} onChange={handleChange} placeholder="Industry" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    <select name="employmentType" value={editData.employmentType} onChange={handleChange} className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300">
                      <option value="">Select Employment Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <select name="workLocation" value={editData.workLocation} onChange={handleChange} className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300">
                      <option value="">Select Work Type</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                    <input type="text" name="fit" value={editData.fit} onChange={handleChange} placeholder="How your profile fits" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    <textarea name="notes" value={editData.notes} onChange={handleChange} placeholder="Notes" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"/>
                    {editData.status === "Interview" && (
                      <>
                        <input type="date" name="interviewDate" value={editData.interviewDate} onChange={handleChange} className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300" required/>
                        <input type="time" name="interviewTime" value={editData.interviewTime} onChange={handleChange} className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300" required/>
                        <input type="text" name="interviewLocation" value={editData.interviewLocation} onChange={handleChange} placeholder="Interview Location" className="w-full border border-purple-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300" required/>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold">{app.position}</h2>
                    <p className="text-black">{app.company}</p>
                    <p className="text-sm text-gray-600">Applied: {app.dateApplied}</p>
                    <p className="text-sm text-gray-600">Salary: {app.salary}</p>
                    <p className="text-sm text-gray-600">Industry: {app.industry}</p>
                    <p className="text-sm text-gray-600">Employment: {app.employmentType}</p>
                    <p className="text-sm text-gray-600">Work: {app.workLocation}</p>
                    <p className="text-sm text-gray-600">Fit: {app.fit}</p>
                    <p className="text-sm text-gray-600">Notes: {app.notes}</p>
                    {app.status === "Interview" && app.interviewDate && (
                      <p className="text-sm text-purple-700">Interview: {new Date(app.interviewDate).toLocaleString()} @ {app.interviewLocation}</p>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                {editingIndex === index ? (
                  <div className="flex flex-col gap-2">
                    <select name="status" value={editData.status} onChange={handleChange} className="px-3 py-1 text-sm rounded-full border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-300">
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(app.id)} className="px-3 py-1 bg-purple-200 text-black rounded hover:bg-purple-300 transition">Save</button>
                      <button onClick={() => setEditingIndex(null)} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      app.status === "Applied" ? "bg-purple-100 text-purple-700" :
                      app.status === "Interview" ? "bg-purple-200 text-purple-800" :
                      app.status === "Offer" ? "bg-purple-300 text-purple-900" :
                      "bg-purple-50 text-purple-600"
                    }`}>
                      {app.status}
                    </span>
                    <button onClick={() => handleEditClick(index, app)} className="text-sm text-purple-700 hover:underline">Edit</button>
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