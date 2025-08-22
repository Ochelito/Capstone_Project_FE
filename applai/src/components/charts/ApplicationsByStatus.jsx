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

function parseDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
}

function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`; // e.g. "2025-7"
}

export default function ApplicationsByStatus() {
  const applications = useApplicationStore((s) => s.applications);

  // ---- Bar data (overall counts by status) ----
  const data = useMemo(() => {
    const counts = { applied: 0, interview: 0, offer: 0, rejected: 0 };
    for (const a of applications) {
      const s = a.status;
      if (s === "applied") counts.applied += 1;
      else if (s === "interview") counts.interview += 1;
      else if (s === "offer") counts.offer += 1;
      else if (s === "rejected") counts.rejected += 1;
    }
    return [
      { name: "Applied", count: counts.applied },
      { name: "Interview", count: counts.interview },
      { name: "Offer", count: counts.offer },
      { name: "Rejected", count: counts.rejected },
    ];
  }, [applications]);

  // ---- Subtext: "Total +X%" (this month vs last month) ----
  const pctLabel = useMemo(() => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;

    for (const a of applications) {
      const d = parseDate(a.createdAt || a.date);
      if (!d) continue;
      const key = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));
      if (key === monthKey(thisMonth)) thisMonthTotal += 1;
      else if (key === monthKey(lastMonth)) lastMonthTotal += 1;
    }

    let pct;
    if (lastMonthTotal === 0) {
      pct = thisMonthTotal > 0 ? 100 : 0;
    } else {
      pct = Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);
    }

    const sign = pct >= 0 ? "+" : "";
    return `${sign}${pct}%`;
  }, [applications]);

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-1">Applications by Status</h3>
      <p className="text-sm text-gray-500">Total {pctLabel}</p>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}