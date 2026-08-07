import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Volunteer from './pages/Volunteer/volunteer';
import VolunteerForm from './pages/Volunteer/volunteer-form';
import VolunteerDetails from './pages/Volunteer/volunteer-details';
import PhotoGallery from './pages/PhotoGallery/photo-gallery';
import PhotoForm from './pages/PhotoGallery/photo-form';
import VideoGallery from './pages/VideoGallery/video-gallery';
import Events from './pages/Events/events';
import News from './pages/News/news';
import ApplyForm from './pages/ApplyForm/apply-form';
import Contact from './pages/Contact/contact';
import Donate from './pages/Donate/donate';
import Reports from './pages/Reports/reports';
import './App.css';
import Dashboard from './pages/Dashboard/dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected Routes wrapped in MainLayout */}
        <Route
          path="/"
          element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="volunteer/view/:id" element={<VolunteerDetails />} />
          <Route path="volunteer-form" element={<VolunteerForm />} />
          <Route path="photo-gallery" element={<PhotoGallery />} />
          <Route path="photo-form" element={<PhotoForm />} />
          <Route path="video-gallery" element={<VideoGallery />} />
          <Route path="events" element={<Events />} />
          <Route path="news" element={<News />} />
          <Route path="apply" element={<ApplyForm />} />
          <Route path="contact" element={<Contact />} />
          <Route path="donate" element={<Donate />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
