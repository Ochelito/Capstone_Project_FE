import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApplicationStore from "@/store/applicationStore";
import useAuthStore from "@/store/authStore";
import ApplicationsByStatus from "@/components/charts/ApplicationsByStatus";
import ApplicationTrends from "@/components/charts/ApplicationTrends";

export default function Dashboard() {
  // Access application and auth state from stores
  const { ready, init, applications } = useApplicationStore();
  const { user, loginMethod } = useAuthStore();
  const displayName = useAuthStore((state) => state.displayName);
  const navigate = useNavigate();

  // Initialize application store when dashboard is loaded
  useEffect(() => {
    if (!ready) {
      const mode = loginMethod === "google" ? "drive" : "local";
      init(mode);
    }
  }, [ready, init, loginMethod]);

  // Show loading state if store not ready
  if (!ready) return <div className="p-6 text-black">Loading dashboard…</div>;

  // Calculate basic statistics
  const total = applications.length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const offers = applications.filter(a => a.status === "Offer").length;
  const rejections = applications.filter(a => a.status === "Rejected").length;

  return (
    <div className="bg-white min-h-screen p-6 space-y-8 text-black">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-700">Welcome {displayName}</p>

      {/* Stats boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total applications */}
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Applied</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        {/* Total interviews */}
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Interviews</h3>
          <p className="text-2xl font-bold">{interviews}</p>
        </div>
        {/* Total offers */}
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Offers</h3>
          <p className="text-2xl font-bold">{offers}</p>
        </div>
        {/* Total rejections */}
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Rejections</h3>
          <p className="text-2xl font-bold">{rejections}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications by Status chart */}
        <div className="bg-purple-100 rounded-xl shadow-md p-4">
          <h3 className="font-semibold mb-1">Applications by Status</h3>
          <p className="text-sm text-gray-600">
            Total {total > 0 ? `+${Math.round(((interviews + offers + rejections) / total) * 100)}%` : "0%"}
          </p>
          <ApplicationsByStatus />
        </div>

        {/* Application Trends chart */}
        <div className="bg-purple-100 rounded-xl shadow-md p-4">
          <h3 className="font-semibold mb-1">Application Trends</h3>
          <p className="text-sm text-gray-600">
            Last 6 months ({total})
          </p>
          <ApplicationTrends />
        </div>
      </div>

      {/* Quick Actions section */}
      <div className="rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          {/* Navigate to add application page */}
          <button
            onClick={() => navigate("/applications")}
            className="px-4 py-2 bg-purple-400 text-black rounded-lg hover:bg-purple-300 transition"
          >
            Add Application
          </button>

          {/* Navigate to view applications section */}
          <button
            onClick={() => navigate("/applications#application-list")}
            className="px-4 py-2 bg-purple-100 text-black rounded-lg hover:bg-purple-100 transition"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}