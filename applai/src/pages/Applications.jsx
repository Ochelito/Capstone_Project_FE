import React from "react";
import AddApplicationButton from "@/components/buttons/AddApplicationButton";
import ApplicationList from "@/components/layout/ApplicationList";

function Applications() {
  return (
    <main className="bg-white min-h-screen p-6 space-y-8 text-black">
      {/* SECTION 1: Add Application */}
      <section className="bg-purple-100 shadow-md rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4">Add New Application</h1>
        <AddApplicationButton className="bg-purple-200 text-black hover:bg-purple-300 transition" />
      </section>

      {/* SECTION 2: View Applications */}
      <section id="application-list" className="bg-purple-100 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-1">Applications</h1>
          <p className="text-gray-700">Track and manage your job applications</p>
        </div>

        {/* Search + Filter UI */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search applications..."
            className="flex-1 px-3 py-2 rounded border border-purple-200 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <select className="px-3 py-2 rounded border border-purple-200 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300">
            <option value="">Filter by Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Application List */}
        <ApplicationList />
      </section>
    </main>
  );
}

export default Applications;