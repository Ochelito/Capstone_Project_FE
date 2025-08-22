import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { BarChart2, FileText, Calendar, LogOut } from "lucide-react"; // icons

function SideBar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { name: "Analytics & Insights", path: "/dashboard", icon: <BarChart2 size={20} /> },
    { name: "Application Management", path: "/applications", icon: <FileText size={20} /> },
    { name: "Upcoming Interviews", path: "/interviews", icon: <Calendar size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6 flex flex-col justify-between">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default SideBar;