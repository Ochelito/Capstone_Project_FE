import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useApplicationStore from "@/store/applicationStore";

/**
 * Parse a date string safely
 * @param {string} d - date string
 * @returns {Date|null} - valid Date object or null if invalid
 */
function parseDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt; // Return null if date is invalid
}

/**
 * Generate a "YYYY-M" key for month-based grouping
 * @param {Date} date
 * @returns {string}
 */
function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

export default function ApplicationsByStatus() {
  // Access all applications from global store
  const applications = useApplicationStore((s) => s.applications);

  /**
   * Compute status counts (Applied, Interview, Offer, Rejected).
   * useMemo ensures recalculation only when applications change.
   */
  const data = useMemo(() => {
    // Initialize counts
    const counts = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };

    // Count each application by status
    for (const a of applications) {
      const s = a.status;
      if (s === "Applied") counts.Applied += 1;
      else if (s === "Interview") counts.Interview += 1;
      else if (s === "Offer") counts.Offer += 1;
      else if (s === "Rejected") counts.Rejected += 1;
    }

    // Convert into recharts-friendly array
    return [
      { name: "Applied", count: counts.Applied },
      { name: "Interview", count: counts.Interview },
      { name: "Offer", count: counts.Offer },
      { name: "Rejected", count: counts.Rejected },
    ];
  }, [applications]);

  /**
   * Calculate month-over-month % change in applications.
   * Example: if last month = 10 and this month = 15 → +50%.
   */
  const pctLabel = useMemo(() => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;

    // Count applications by createdAt or date field
    for (const a of applications) {
      const d = parseDate(a.createdAt || a.date);
      if (!d) continue; // Skip invalid dates

      const key = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));

      if (key === monthKey(thisMonth)) thisMonthTotal += 1;
      else if (key === monthKey(lastMonth)) lastMonthTotal += 1;
    }

    // Calculate percentage change
    let pct;
    if (lastMonthTotal === 0) {
      pct = thisMonthTotal > 0 ? 100 : 0; // If no last month data, treat as 100% if growth
    } else {
      pct = Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);
    }

    // Add sign (+/-) for display
    const sign = pct >= 0 ? "+" : "";
    return `${sign}${pct}%`;
  }, [applications]);

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow-lg p-4 flex flex-col">
      {/* Chart title and summary */}
      <h3 className="text-black font-semibold mb-1 text-lg">Applications by Status</h3>
      <p className="text-gray-600 text-sm mb-3">Total {pctLabel}</p>

      {/* Responsive container for bar chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
        >
          {/* Gridlines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          {/* Axis labels */}
          <XAxis dataKey="name" tick={{ fill: "#000" }} />
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

          {/* Bars */}
          <Bar dataKey="count" fill="#C3B1E1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}