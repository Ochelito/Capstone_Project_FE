import React, { useState } from "react";

function AddApplicationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Application:", formData);
    // 🔜 Next step: Save to Zustand store
    setFormData({ company: "", position: "", status: "Applied" });
    setIsOpen(false);
  };

  return (
    <div>
      {!isOpen ? (
        // Button state
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          +
        </button>
      ) : (
        // Expanded form state
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border p-4 rounded-lg bg-gray-50"
        >
          <div>
            <label className="block font-medium">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddApplicationButton;