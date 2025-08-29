import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApplicationStore from "@/store/applicationStore";
import useAuthStore from "@/store/authStore";
import ApplicationsByStatus from "@/components/charts/ApplicationsByStatus";
import ApplicationTrends from "@/components/charts/ApplicationTrends";

export default function Dashboard() {
  const { ready, init, applications } = useApplicationStore();
  const { user, loginMethod, logout } = useAuthStore();
  const displayName = useAuthStore((state) => state.displayName); // 🔹 Get from authStore
  const navigate = useNavigate();

  // 🔹 Initialize applications based on login type
  useEffect(() => {
    if (!ready) {
      const mode = loginMethod === "google" ? "drive" : "local";
      init(mode);
    }
  }, [ready, init, loginMethod]);

  if (!ready) return <div className="p-6">Loading dashboard…</div>;

  // 🔹 Stats
  const total = applications.length;
  const interviews = applications.filter(a => a.status === "interview").length;
  const offers = applications.filter(a => a.status === "offer").length;
  const rejections = applications.filter(a => a.status === "rejected").length;

  // 🔹 Quick action handlers
  const handleViewApplications = () => {
    if (applications.length === 0) {
      alert("No applications yet, please add one!");
    } else {
      navigate("/applications");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome back, {displayName}</p>

      {/* Stats boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h3 className="text-lg font-semibold">Applied</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h3 className="text-lg font-semibold">Interviews</h3>
          <p className="text-2xl font-bold">{interviews}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h3 className="text-lg font-semibold">Offers</h3>
          <p className="text-2xl font-bold">{offers}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h3 className="text-lg font-semibold">Rejections</h3>
          <p className="text-2xl font-bold">{rejections}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-1">Applications by Status</h3>
          <p className="text-sm text-gray-500">
            Total {total > 0 ? `+${Math.round(((interviews + offers + rejections) / total) * 100)}%` : "0%"}
          </p>
          <ApplicationsByStatus />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-1">Application Trends</h3>
          <p className="text-sm text-gray-500">
            Last 6 months ({total})
          </p>
          <ApplicationTrends />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/applications")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Application
          </button>
          <button
            onClick={() => navigate("/applications#application-list")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}