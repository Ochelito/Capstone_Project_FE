import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { BarChart2, FileText, Calendar, LogOut, Menu, X } from "lucide-react";

function SideBar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const links = [
    { name: "Analytics & Insights", path: "/dashboard", icon: <BarChart2 size={24} /> },
    { name: "Application Management", path: "/applications", icon: <FileText size={24} /> },
    { name: "Upcoming Interviews", path: "/interviews", icon: <Calendar size={24} /> },
  ];

  return (
    <>
      {/* Hamburger */}
      <div className="fixed top-4 left-4 z-60 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-purple-600 shadow-md hover:bg-purple-700 transition"
        >
          {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          bg-gradient-to-b from-purple-700 to-purple-900 text-white flex flex-col
        `}
      >
        {/* Close button at top-right */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-white" />
          </button>
        </div>

        {/* Logo / Title */}
        <div className="flex flex-col items-center justify-start mb-12 mt-12">
          <h1 className="text-2xl font-bold text-white mb-2">Job Tracker</h1>
          <p className="text-white/80 text-sm text-center px-6">
            Manage applications & track interviews easily
          </p>
      </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-6 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-semibold w-3/4 justify-center
                transition-all duration-200
                ${isActive ? "bg-white text-purple-800 shadow-lg" : "hover:bg-white/20"}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-8 py-3 bg-red-500 rounded-full font-bold hover:bg-red-600 transition shadow-lg"
          >
            <LogOut size={24} />
            Logout
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-md min-h-screen p-6 flex-col border-r border-purple-100
                        pt-20 z-40">
        <div className="mb-8">
          <p className="text-lg font-bold text-black">Manage Applications & Track Interviews</p>
        </div>

        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActive ? "bg-purple-600 text-white shadow-md" : "text-purple-700 hover:bg-purple-100 hover:text-purple-900"}`
              }
            >
              {link.icon}
              <span className="truncate">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm w-full justify-center"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar;