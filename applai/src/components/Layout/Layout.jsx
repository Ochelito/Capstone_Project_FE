import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";

function Layout() {
  return (
    <div className="layout">
      {/* Header at the top */}
      <Header />

      {/* Container for sidebar + main content */}
      <div className="layout-body">
        {/* Sidebar on the left */}
        <SideBar />

        {/* Main content to the right of sidebar */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;