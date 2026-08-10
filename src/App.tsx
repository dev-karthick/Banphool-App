import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/login';
import Volunteer from './pages/Volunteer/volunteer';
import VolunteerForm from './pages/Volunteer/volunteer-form';
import VolunteerDetails from './pages/Volunteer/volunteer-details';
import PhotoGallery from './pages/PhotoGallery/photo-gallery';
import PhotoForm from './pages/PhotoGallery/photo-form';
import PhotoView from './pages/PhotoGallery/photo-view';
import VideoGallery from './pages/VideoGallery/video-gallery';
import VideoForm from './pages/VideoGallery/video-form';
import Events from './pages/Events/events';
import EventForm from './pages/Events/event-form';
import EventView from './pages/Events/event-view';
import News from './pages/News/news';
import ApplyForm from './pages/ApplyForm/apply-form';
import Contact from './pages/Contact/contact';
import Donate from './pages/Donate/donate';
import Reports from './pages/Reports/reports';
import './App.css';
import Dashboard from './pages/Dashboard/dashboard';
import VideoView from './pages/VideoGallery/video-view';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('accessToken'));

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
          <Route path="photo-gallery/view/:id" element={<PhotoView />} />
          <Route path="photo-form" element={<PhotoForm />} />
          <Route path="video-gallery" element={<VideoGallery />} />
          <Route path="video-form" element={<VideoForm />} />
          <Route path="video-gallery/view/:id" element={<VideoView />} />
          <Route path="events" element={<Events />} />
          <Route path="events-form" element={<EventForm />} />
          <Route path="events/view/:id" element={<EventView />} />
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
