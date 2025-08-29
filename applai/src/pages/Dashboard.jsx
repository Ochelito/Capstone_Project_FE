import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApplicationStore from "@/store/applicationStore";
import useAuthStore from "@/store/authStore";
import ApplicationsByStatus from "@/components/charts/ApplicationsByStatus";
import ApplicationTrends from "@/components/charts/ApplicationTrends";

export default function Dashboard() {
  const { ready, init, applications } = useApplicationStore();
  const { user, loginMethod, logout } = useAuthStore();
  const displayName = useAuthStore((state) => state.displayName);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) {
      const mode = loginMethod === "google" ? "drive" : "local";
      init(mode);
    }
  }, [ready, init, loginMethod]);

  if (!ready) return <div className="p-6 text-black">Loading dashboard…</div>;

  const total = applications.length;
  const interviews = applications.filter(a => a.status === "interview").length;
  const offers = applications.filter(a => a.status === "offer").length;
  const rejections = applications.filter(a => a.status === "rejected").length;

  return (
    <div className="bg-white min-h-screen p-6 space-y-8 text-black">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-700">Welcome back, {displayName}</p>

      {/* Stats boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Applied</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Interviews</h3>
          <p className="text-2xl font-bold">{interviews}</p>
        </div>
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Offers</h3>
          <p className="text-2xl font-bold">{offers}</p>
        </div>
        <div className="bg-purple-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Rejections</h3>
          <p className="text-2xl font-bold">{rejections}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-purple-100 rounded-xl shadow-md p-4">
          <h3 className="font-semibold mb-1">Applications by Status</h3>
          <p className="text-sm text-gray-600">
            Total {total > 0 ? `+${Math.round(((interviews + offers + rejections) / total) * 100)}%` : "0%"}
          </p>
          <ApplicationsByStatus />
        </div>

        <div className="bg-purple-100 rounded-xl shadow-md p-4">
          <h3 className="font-semibold mb-1">Application Trends</h3>
          <p className="text-sm text-gray-600">
            Last 6 months ({total})
          </p>
          <ApplicationTrends />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-purple-100 rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/applications")}
            className="px-4 py-2 bg-purple-200 text-black rounded-lg hover:bg-purple-300 transition"
          >
            Add Application
          </button>
          <button
            onClick={() => navigate("/applications#application-list")}
            className="px-4 py-2 bg-purple-50 text-black rounded-lg hover:bg-purple-100 transition"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}