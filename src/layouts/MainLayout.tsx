import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/sidebar";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10 p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;