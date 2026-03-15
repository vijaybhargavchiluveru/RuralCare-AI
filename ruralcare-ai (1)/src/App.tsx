import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatientPortal from './pages/PatientPortal';
import HospitalRecommendation from './pages/HospitalRecommendation';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDirectory from './pages/DoctorDirectory';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient" element={<PatientPortal />} />
            <Route path="/hospitals" element={<HospitalRecommendation />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/physicians" element={<DoctorDirectory />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
