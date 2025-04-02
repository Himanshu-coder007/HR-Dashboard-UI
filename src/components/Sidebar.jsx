import { Link } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiInbox,
  FiCalendar,
  FiFolder,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiUserPlus,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { selectCurrentUser } from "../store/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("http://localhost:8080/api/v1/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");

      // Dispatch logout action to clear Redux state
      dispatch(logout());

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // You might want to show an error message to the user
    }
  };

  return (
    <div className="w-64 h-full bg-gray-900 text-gray-200 flex flex-col border-r border-gray-800">
      {/* Company Logo and Name */}
      <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
          <span className="text-white">⚡</span>
        </div>
        <h1 className="text-lg font-bold text-white">Efficio</h1>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-b border-gray-800 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.textContent = "👤";
                e.target.className = "text-xl text-gray-400";
              }}
            />
          </div>
          <div className="ml-3">
            <p className="font-medium text-white">{user.fullname}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs text-blue-400 capitalize">{user.role}</p>
          </div>
        </div>
      )}

      {/* Navigation Menu with Icons */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            Main Menu
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <FiHome className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <FiCheckSquare className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/inbox"
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <FiInbox className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Inbox</span>
              </Link>
            </li>
            <li>
              <Link
                to="/calender"
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <FiCalendar className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Calendar</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <FiFolder className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Projects</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* HR Management Section - Only visible to HR users */}
        {user?.role === "hr" && (
          <>
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                HR Management
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/employees"
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <FiUsers className="text-lg text-gray-400 group-hover:text-blue-400" />
                    <span className="ml-3 group-hover:text-white">Employees</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/attendance"
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <FiClock className="text-lg text-gray-400 group-hover:text-blue-400" />
                    <span className="ml-3 group-hover:text-white">Attendance</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/payroll"
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <FiDollarSign className="text-lg text-gray-400 group-hover:text-blue-400" />
                    <span className="ml-3 group-hover:text-white">Payroll</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hiring"
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <FiUserPlus className="text-lg text-gray-400 group-hover:text-blue-400" />
                    <span className="ml-3 group-hover:text-white">Hiring</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Analytics & Reports
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/analytics"
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <FiBarChart2 className="text-lg text-gray-400 group-hover:text-blue-400" />
                    <span className="ml-3 group-hover:text-white">Reports</span>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Common Settings Section */}
        <div className="mb-4">
          <ul className="space-y-1">
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group">
                <FiSettings className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Settings</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group">
                <FiHelpCircle className="text-lg text-gray-400 group-hover:text-blue-400" />
                <span className="ml-3 group-hover:text-white">Help & Support</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-2 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors group"
        >
          <FiLogOut className="text-lg text-gray-400 group-hover:text-red-400" />
          <span className="ml-3 group-hover:text-white">Logout</span>
        </button>
      </div>

      {/* Plan Information Section - Only visible to HR users */}
      {user?.role === "hr" && (
        <div className="p-4 border-t border-gray-800 bg-gray-800 mt-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-sm text-white">Basic Plan</span>
            <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
              Trial
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-2">Trial ends in 4 days</p>
          <p className="text-xs text-gray-500">
            You are on a free trial of the Basic plan on monthly billing.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;