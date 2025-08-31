import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useApplicationStore from "@/store/applicationStore";

/**
 * Parse a date string safely.
 * @param {string} d - date string
 * @returns {Date|null} - valid Date or null if invalid
 */
function parseDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt; // return null if invalid
}

/**
 * Generate a key for month grouping ("YYYY-M").
 * @param {Date} date
 * @returns {string}
 */
function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

/**
 * Format month for display (e.g. "Aug 2025").
 * @param {Date} date
 * @returns {string}
 */
function monthLabel(date) {
  return date.toLocaleString("default", { month: "short", year: "numeric" });
}

export default function ApplicationTrends() {
  // Get all applications from the global store
  const applications = useApplicationStore((s) => s.applications);

  // Early return: no data yet
  if (applications.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-white rounded-xl shadow-lg p-4">
        <p className="text-gray-500">No applications yet to display trends.</p>
      </div>
    );
  }

  /**
   * Prepare chart data for the last 6 months.
   * useMemo avoids recalculation unless `applications` changes.
   */
  const data = useMemo(() => {
    const now = new Date();
    const months = [];

    // Generate the last 6 months (including current month)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d);
    }

    // Count applications by month
    const counts = {};
    for (const a of applications) {
      const d = parseDate(a.createdAt || a.date);
      if (!d) continue; // skip if invalid date
      const key = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));
      counts[key] = (counts[key] || 0) + 1;
    }

    // Build final dataset for Recharts
    return months.map((m) => {
      const key = monthKey(m);
      return {
        month: monthLabel(m), // e.g. "Aug 2025"
        count: counts[key] || 0, // fallback: 0 if no apps
      };
    });
  }, [applications]);

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow-lg p-4 flex flex-col">
      {/* Chart title and timeframe */}
      <h3 className="text-black font-semibold mb-1 text-lg">Application Trends</h3>
      <p className="text-gray-600 text-sm mb-3">Last 6 months</p>

      {/* Responsive line chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          {/* Gridlines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          {/* Axes */}
          <XAxis dataKey="month" tick={{ fill: "#000" }} />
          <YAxis allowDecimals={false} tick={{ fill: "#000" }} />

          {/* Tooltip on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              borderColor: "#E5E7EB",
            }}
            itemStyle={{ color: "#000" }}
          />

          {/* Line showing application counts */}
          <Line
            type="monotone"
            dataKey="count"
            stroke="#C3B1E1"
            strokeWidth={2}
            dot={{ r: 4 }} // small dots for each data point
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}