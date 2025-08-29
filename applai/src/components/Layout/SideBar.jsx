import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { BarChart2, FileText, Calendar, LogOut, Menu } from "lucide-react";

function SideBar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

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
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-between items-center p-4 bg-purple-100 shadow-md">
        <h2 className="font-bold text-lg text-purple-800">Job Tracker</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} className="text-purple-800" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          w-64 bg-purple-50 shadow-lg min-h-screen p-6 flex flex-col justify-between
          fixed md:static top-0 left-0 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-purple-400 text-white shadow-inner"
                    : "text-purple-800 hover:bg-purple-200 hover:text-purple-900"
                }`
              }
            >
              {link.icon}
              <span className="truncate">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default SideBar;