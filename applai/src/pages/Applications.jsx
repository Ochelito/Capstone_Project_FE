import React from "react";
import AddApplicationButton from "@/components/buttons/AddApplicationButton";
import ApplicationList from "@/components/layout/ApplicationList";

function Applications() {
  return (
    <main className="p-6 space-y-8">
      {/* SECTION 1: Add Application */}
      <section className="bg-white shadow rounded-lg p-4">
        <h1 className="text-xl font-semibold mb-4">Add New Application</h1>
        <AddApplicationButton />
      </section>

      {/* SECTION 2: View Applications */}
      <section id="application-list" className="bg-white shadow rounded-lg p-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Applications</h1>
          <p className="text-gray-500">Track and manage your job applications</p>
        </div>

        {/* Search + Filter UI */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search applications..."
            className="border rounded px-3 py-2 flex-1"
          />
          <select className="border rounded px-3 py-2">
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