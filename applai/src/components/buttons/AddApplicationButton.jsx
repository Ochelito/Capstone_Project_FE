import React, { useState } from "react";
import useApplicationStore from "@/store/applicationStore";

export default function AddApplicationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    interviewDate: "",
    interviewTime: "",
    interviewLocation: "",
    salaryOffer: "",
    industry: "",
    employmentType: "Full-time",
    workLocation: "Remote",
    experienceFit: "",
    notes: "",
    priority: "Medium",
  });

  const addApplication = useApplicationStore((state) => state.addApplication);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.status === "Interview") {
      if (!formData.interviewDate || !formData.interviewTime || !formData.interviewLocation) {
        alert("For interviews, date, time, and location are required.");
        return;
      }
    }

    const newApp = {
      ...formData,
      id: Date.now(),
      dateApplied: new Date().toLocaleDateString(),
      interviewDate: formData.status === "Interview" ? `${formData.interviewDate}T${formData.interviewTime}` : null,
    };

    addApplication(newApp);

    setFormData({
      company: "",
      position: "",
      status: "Applied",
      interviewDate: "",
      interviewTime: "",
      interviewLocation: "",
      salaryOffer: "",
      industry: "",
      employmentType: "Full-time",
      workLocation: "Remote",
      experienceFit: "",
      notes: "",
      priority: "Medium",
    });
    setIsOpen(false);
  };

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl bg-purple-300 text-black px-4 py-2 rounded-full hover:bg-purple-400 transition"
        >
          +
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4 w-full max-w-lg mx-auto">
          <h3 className="text-xl font-semibold text-black">Add New Application</h3>

          {/* Company & Position */}
          <div>
            <label className="block text-black font-medium mb-1">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-1">Position</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-black font-medium mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Interview fields */}
          {formData.status === "Interview" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              />
              <input type="time" name="interviewTime" value={formData.interviewTime} onChange={handleChange} required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              />
              <input type="text" name="interviewLocation" placeholder="Location" value={formData.interviewLocation} onChange={handleChange} required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              />
            </div>
          )}

          {/* Other fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" name="salaryOffer" value={formData.salaryOffer} onChange={handleChange}
              placeholder="Salary Offer" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
            <input type="text" name="industry" value={formData.industry} onChange={handleChange}
              placeholder="Industry" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select name="employmentType" value={formData.employmentType} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            <select name="workLocation" value={formData.workLocation} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <textarea name="experienceFit" value={formData.experienceFit} onChange={handleChange} placeholder="Experience / Fit for Role"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
          />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
          />

          <select name="priority" value={formData.priority} onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button type="submit" className="bg-purple-300 text-black px-4 py-2 rounded-lg hover:bg-purple-400 transition">Save</button>
            <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}