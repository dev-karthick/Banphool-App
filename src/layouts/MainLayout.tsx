import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/sidebar";

function MainLayout() {
  // Determine initial state based on window size (e.g. mobile vs desktop)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="container-fluid p-0">
        <div className="d-flex" style={{ minHeight: 'calc(100vh - 75px)' }}>
          <div style={{ width: isSidebarOpen ? '250px' : '80px', transition: 'width 0.3s ease', flexShrink: 0 }}>
            <Sidebar collapsed={!isSidebarOpen} />
          </div>
          <div className="flex-grow-1" style={{ transition: 'all 0.3s ease', overflowX: 'hidden' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;