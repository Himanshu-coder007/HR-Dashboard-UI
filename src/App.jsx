import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './store/userSlice';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Task from './pages/Task';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calender';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Project from './pages/Project';
import Payroll from './pages/Payroll';
import Hiring from './pages/Hiring';
import AuthPage from './auth/Auth';
import Unauthorized from './pages/Unauthorized';
import Analytics from './pages/Analytics';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = useSelector(selectCurrentUser);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // HR can access all routes
  if (user.role === 'hr') {
    return children;
  }

  // Check if user's role is allowed
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Role-specific route components
const EmployeeRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['employee', 'hr']}>{children}</ProtectedRoute>
);

const HRRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['hr']}>{children}</ProtectedRoute>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          
          {/* Available to both employees and HR */}
          <Route path="tasks" element={<EmployeeRoute><Task /></EmployeeRoute>} />
          <Route path="inbox" element={<EmployeeRoute><Inbox /></EmployeeRoute>} />
          <Route path="calender" element={<EmployeeRoute><Calendar /></EmployeeRoute>} />
          <Route path="projects" element={<EmployeeRoute><Project /></EmployeeRoute>} />
          
          {/* HR-only Routes */}
          <Route path="employees" element={<HRRoute><Employees /></HRRoute>} />
          <Route path="attendance" element={<HRRoute><Attendance /></HRRoute>} />
          <Route path="payroll" element={<HRRoute><Payroll /></HRRoute>} />
          <Route path="hiring" element={<HRRoute><Hiring /></HRRoute>} />
          <Route path="analytics" element={<HRRoute><Analytics /></HRRoute>} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;