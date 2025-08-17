import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

function Layout() {
    return (
        <div className="layout">
            <Header />
            <div>
                <SideBar />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;