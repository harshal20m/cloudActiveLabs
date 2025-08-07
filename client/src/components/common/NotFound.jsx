import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <div className="text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </div>
            <p className="text-xl text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>

            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Looking for something specific?
            </h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                → Browse All Jobs
              </Link>
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700"
              >
                → Admin Login
              </Link>
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                → Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
