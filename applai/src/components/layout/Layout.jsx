import { Outlet } from "react-router-dom";
import SideBar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

function Layout() {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar stays fixed on desktop */}
      <SideBar />

      {/* Main container with header + scrollable content */}
      <div className="flex-1 flex flex-col">
        {/* Header fixed at the top */}
        <Header />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto mt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;