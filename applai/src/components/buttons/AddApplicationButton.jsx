import React, { useState } from "react";
import useApplicationStore from "@/store/applicationStore";

// Component: AddApplicationButton
// This component toggles between a "+" button and an application form.
// It allows users to add a new job application and save it into the global store.
export default function AddApplicationButton() {
  // State to control whether the form is open or not
  const [isOpen, setIsOpen] = useState(false);

  // State for storing form input values
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

  // Accessing global store function to add a new application
  const addApplication = useApplicationStore((state) => state.addApplication);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: If status is "Interview", require date, time, and location
    if (formData.status === "Interview") {
      if (!formData.interviewDate || !formData.interviewTime || !formData.interviewLocation) {
        alert("For interviews, date, time, and location are required.");
        return;
      }
    }

    // Create a new application object
    const newApp = {
      ...formData,
      id: Date.now(), // unique ID based on timestamp
      dateApplied: new Date().toLocaleDateString(), // current date
      interviewDate: formData.status === "Interview"
        ? `${formData.interviewDate}T${formData.interviewTime}` // combine date + time
        : null,
    };

    // Save application into global store
    addApplication(newApp);

    // Reset form to initial state after saving
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

    // Close the form
    setIsOpen(false);
  };

  return (
    <div>
      {/* Show "+" button when form is closed */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl bg-purple-300 text-black px-4 py-2 rounded-full hover:bg-purple-400 transition"
        >
          +
        </button>
      ) : (
        // Show form when isOpen = true
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4 w-full max-w-lg mx-auto"
        >
          <h3 className="text-xl font-semibold text-black">Add New Application</h3>

          {/* Company input */}
          <div>
            <label className="block text-black font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Position input */}
          <div>
            <label className="block text-black font-medium mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Status dropdown */}
          <div>
            <label className="block text-black font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Interview fields (only visible if status = Interview) */}
          {formData.status === "Interview" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              />
              <input
                type="time"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              />
              <input
                type="text"
                name="interviewLocation"
                placeholder="Location"
                value={formData.interviewLocation}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
              />
            </div>
          )}

          {/* Salary & Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="salaryOffer"
              value={formData.salaryOffer}
              onChange={handleChange}
              placeholder="Salary Offer"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Industry"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Employment Type & Work Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            <select
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          {/* Experience fit */}
          <textarea
            name="experienceFit"
            value={formData.experienceFit}
            onChange={handleChange}
            placeholder="Experience / Fit for Role"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
          />

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
          />

          {/* Priority dropdown */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="bg-purple-300 text-black px-4 py-2 rounded-lg hover:bg-purple-400 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}