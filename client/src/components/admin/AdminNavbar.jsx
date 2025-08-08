import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronDown,
  Plus,
  Home,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ onSidebarToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onSidebarToggle}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb / Title */}
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Dashboard
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            to="/admin/jobs/create"
            className="flex items-center space-x-1 px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Job</span>
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Notifications */}

        {/* View Site */}
        <Link
          to="/"
          className="hidden sm:flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-md hover:border-primary-300 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm">View Site</span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
              <div className="p-3 border-b">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Link>

                <hr className="my-1" />

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for dropdowns */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default AdminNavbar;
