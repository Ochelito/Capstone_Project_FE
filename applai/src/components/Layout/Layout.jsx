import { Outlet } from "react-router-dom";
import SideBar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

function Layout() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header at the top */}
      <Header />

      {/* Container for sidebar + main content */}
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <SideBar className="w-64 bg-purple-100" />

        {/* Main content to the right of sidebar */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;