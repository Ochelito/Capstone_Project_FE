import React, { useState } from "react";
import useApplicationStore from "@/store/applicationStore"; // Zustand store

function AddApplicationButton() {
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

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validate interview fields if status is Interview
    if (formData.status === "Interview") {
      if (!formData.interviewDate || !formData.interviewTime || !formData.interviewLocation) {
        alert("For interviews, date, time, and location are required.");
        return;
      }
    }

    // 🔹 Build new application object
    const newApp = {
      ...formData,
      id: Date.now(), // simple unique id
      dateApplied: new Date().toLocaleDateString(),
      interviewDate: formData.status === "Interview" ? `${formData.interviewDate}T${formData.interviewTime}` : null,
    };

    // 🔹 Save to Zustand store
    addApplication(newApp);

    // 🔹 Reset form
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
          className="text-2xl bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          +
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <div>
            <label className="block font-medium">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium">Position</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Conditional interview fields */}
          {formData.status === "Interview" && (
            <div className="space-y-2">
              <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input type="time" name="interviewTime" value={formData.interviewTime} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input type="text" name="interviewLocation" placeholder="Location" value={formData.interviewLocation} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
          )}

          <div>
            <label className="block font-medium">Salary Offer</label>
            <input type="text" name="salaryOffer" value={formData.salaryOffer} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium">Industry</label>
            <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium">Employment Type</label>
            <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Work Location</label>
            <select name="workLocation" value={formData.workLocation} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Experience / Fit for Role</label>
            <textarea name="experienceFit" value={formData.experienceFit} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium">Priority / Importance</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
            <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddApplicationButton;