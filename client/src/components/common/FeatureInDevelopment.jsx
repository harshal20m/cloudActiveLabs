import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Construction,
  ArrowLeft,
  Home,
  Calendar,
  Wrench,
  Code2,
} from "lucide-react";

const FeatureInDevelopment = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getFeatureName = (path) => {
    const pathMap = {
      "/about": "About Page",
      "/contact": "Contact Page",
      "/profile": "User Profile",
      "/my-applications": "My Applications",
      "/register": "User Registration",
      "/admin/analytics": "Analytics Dashboard",
      "/admin/users": "User Management",
      "/admin/messages": "Messages",
      "/admin/settings": "Settings",
      "/admin/notifications": "Notifications",
      "/admin/profile": "Admin Profile",
      "/jobs": "Job Listings (Alternative Route)",
      "/admin/jobs/archived": "Archived Jobs",
    };

    return pathMap[path] || "This Feature";
  };

  const upcomingFeatures = [
    {
      icon: Code2,
      title: "Advanced Search & Filters",
      description:
        "Enhanced job search with salary range, company size, and skill-based filtering",
      eta: "Coming Soon",
    },
    {
      icon: Calendar,
      title: "Application Tracking",
      description:
        "Track your job applications with status updates and interview scheduling",
      eta: "Next Update",
    },
    {
      icon: Wrench,
      title: "Company Profiles",
      description:
        "Detailed company pages with culture insights, reviews, and team information",
      eta: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Construction Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <Construction className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🚧 Feature in Development
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              <strong>{getFeatureName(currentPath)}</strong> is currently under
              development
            </p>
            <p className="text-gray-500">
              We're working hard to bring you this feature. Check back soon!
            </p>
          </div>

          {/* Current Path Info */}
          <div className="mb-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Requested Route:</span>{" "}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                {currentPath}
              </code>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

            <Link
              to="/admin"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Admin Panel
            </Link>
          </div>

          {/* Upcoming Features */}
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              What's Coming Next
            </h2>

            <div className="grid gap-6 md:grid-cols-1">
              {upcomingFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {feature.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {feature.eta}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Have Suggestions?
            </h3>
            <p className="text-gray-600 mb-4">
              We'd love to hear your feedback on what features you'd like to see
              next!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:admin@jobboard.com"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Send Feedback
              </a>
              <a
                href="https://github.com/your-repo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-center"
              >
                Report Issues
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureInDevelopment;
