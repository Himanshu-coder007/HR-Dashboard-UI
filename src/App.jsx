import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Task from './pages/Task';
import Inbox from './pages/Inbox';
import Calender from './pages/Calender';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Project from './pages/Project';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Task />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="calender" element={<Calender />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="projects" element={<Project />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;