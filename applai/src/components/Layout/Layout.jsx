import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header always on top */}
      <Header />

      {/* Sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;