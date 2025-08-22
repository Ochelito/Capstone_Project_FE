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

function parseDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
}

function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`; // e.g. "2025-7"
}

function monthLabel(date) {
  return date.toLocaleString("default", { month: "short", year: "numeric" });
}

export default function ApplicationTrends() {
  const applications = useApplicationStore((s) => s.applications);

  if (applications.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-white rounded-xl shadow p-4">
        <p className="text-gray-500">No applications yet to display trends.</p>
      </div>
    );
  }

  const data = useMemo(() => {
    const now = new Date();
    const months = [];

    // build an array of last 6 months (newest last)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d);
    }

    // count per month
    const counts = {};
    for (const a of applications) {
      const d = parseDate(a.createdAt || a.date);
      if (!d) continue;
      const key = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));
      counts[key] = (counts[key] || 0) + 1;
    }

    return months.map((m) => {
      const key = monthKey(m);
      return {
        month: monthLabel(m),
        count: counts[key] || 0,
      };
    });
  }, [applications]);

return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-1">Application Trends</h3>
      <p className="text-sm text-gray-500">Last 6 months</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}