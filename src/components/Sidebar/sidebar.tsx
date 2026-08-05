import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <aside className="premium-sidebar">
      <div className="sidebar-menu-title">
        <i className="bi bi-compass"></i>
        <span>Navigation</span>
      </div>

      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <NavLink to="/" className="sidebar-link">
            <i className="bi bi-person-badge-fill sidebar-icon"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/volunteer" className="sidebar-link">
            <i className="bi bi-person-badge-fill sidebar-icon"></i>
            <span>Volunteer Registration</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/photo-gallery" className="sidebar-link">
            <i className="bi bi-image-fill sidebar-icon"></i>
            <span>Photo Gallery</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/video-gallery" className="sidebar-link">
            <i className="bi bi-camera-video-fill sidebar-icon"></i>
            <span>Video Gallery</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/events" className="sidebar-link">
            <i className="bi bi-calendar-event-fill sidebar-icon"></i>
            <span>Events</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/news" className="sidebar-link">
            <i className="bi bi-newspaper sidebar-icon"></i>
            <span>News Updates</span>
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-menu-title" style={{ marginTop: '1rem' }}>
        <i className="bi bi-ui-checks-grid"></i>
        <span>Applications & Forms</span>
      </div>

      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <NavLink to="/apply" className="sidebar-link">
            <i className="bi bi-file-earmark-text-fill sidebar-icon"></i>
            <span>Apply Now Form</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/contact" className="sidebar-link">
            <i className="bi bi-envelope-fill sidebar-icon"></i>
            <span>Contact Us</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/donate" className="sidebar-link">
            <i className="bi bi-heart-fill sidebar-icon"></i>
            <span>Donate</span>
          </NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/reports" className="sidebar-link">
            <i className="bi bi-bar-chart-line-fill sidebar-icon"></i>
            <span>Apply Form Reports</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;