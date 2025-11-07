import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/student/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import LmsLogin from './pages/lms/LmsLogin';
import LmsDashboard from './pages/lms/LmsDashboard';
import StaffLogin from './pages/staff/StaffLogin';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdmissionLogin from './pages/admission/AdmissionLogin';
import AdmissionDashboard from './pages/admission/AdmissionDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/lms/login" element={<LmsLogin />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/admission/login" element={<AdmissionLogin />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lms/dashboard"
          element={
            <ProtectedRoute requiredRole="lms_student">
              <LmsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute requiredRole={['staff', 'admin']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admission/dashboard"
          element={
            <ProtectedRoute requiredRole={['admin', 'staff']}>
              <AdmissionDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

