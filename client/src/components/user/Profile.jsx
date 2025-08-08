import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Not logged in
          </h2>
          <p className="text-gray-600 mb-4">
            Please log in to view your profile
          </p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">View your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-600 capitalize">{user.role} Account</p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/my-applications"
                className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                My Applications
              </Link>

              <Link
                to="/jobs"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse Jobs
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center justify-center px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mt-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Complete Your Profile
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Profile editing features are coming soon! For now, you can view
                your current information and access your applications.
              </p>
              <p className="text-xs text-blue-600">
                Need to update your information? Contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
