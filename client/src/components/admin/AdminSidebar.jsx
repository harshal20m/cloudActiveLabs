import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  BarChart3,
  Calendar,
  Mail,
  X,
  Plus,
  ChevronRight,
} from "lucide-react";
import { jobAPI, applicationAPI } from "../../services/api";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [stats, setStats] = useState([
    { label: "Active Jobs", value: "...", color: "text-green-600" },
    { label: "New Applications", value: "...", color: "text-blue-600" },
    { label: "Pending Reviews", value: "...", color: "text-orange-600" },
  ]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      // Fetch jobs data
      const jobsResponse = await jobAPI.getAllJobsForAdmin({ limit: 1000 });
      const allJobs = jobsResponse.data.jobs || [];
      const activeJobs = allJobs.filter((job) => job.isActive).length;

      // Fetch applications data
      const applicationsResponse = await applicationAPI.getApplications();
      const allApplications = applicationsResponse.data || [];

      // Get applications from last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const newApplications = allApplications.filter(
        (app) => new Date(app.createdAt) >= sevenDaysAgo
      ).length;

      const pendingReviews = allApplications.filter(
        (app) => app.status === "pending"
      ).length;

      // Update stats
      setStats([
        {
          label: "Active Jobs",
          value: activeJobs.toString(),
          color: "text-green-600",
        },
        {
          label: "New Applications",
          value: newApplications.toString(),
          color: "text-blue-600",
        },
        {
          label: "Pending Reviews",
          value: pendingReviews.toString(),
          color: "text-orange-600",
        },
      ]);
    } catch (error) {
      console.error("Error fetching sidebar stats:", error);
      // Keep loading state or show error state
      setStats([
        { label: "Active Jobs", value: "N/A", color: "text-gray-500" },
        { label: "New Applications", value: "N/A", color: "text-gray-500" },
        { label: "Pending Reviews", value: "N/A", color: "text-gray-500" },
      ]);
    } finally {
      setStatsLoading(false);
    }
  };

  const isActive = (href) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      description: "Overview & analytics",
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      icon: Briefcase,
      description: "Manage job postings",
      subItems: [
        { name: "All Jobs", href: "/admin/jobs" },
        { name: "Create Job", href: "/admin/jobs/create" },
        { name: "Archived Jobs", href: "/admin/jobs/archived" },
      ],
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: FileText,
      description: "Review applications",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      description: "Performance insights",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      description: "Manage users",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: Mail,
      description: "Contact inquiries",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "System configuration",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b bg-primary-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">JobBoard</h1>
              <p className="text-xs text-primary-100">Admin Panel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-primary-100 hover:text-white hover:bg-primary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Quick Stats
            </h3>
            {statsLoading && (
              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <div className="space-y-2">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span
                  className={`text-sm font-semibold ${stat.color} ${
                    statsLoading ? "animate-pulse" : ""
                  }`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <button
              onClick={fetchStats}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              disabled={statsLoading}
            >
              {statsLoading ? "Updating..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive(item.href)
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.subItems && (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </Link>

                {/* Sub Items */}
                {item.subItems && isActive(item.href) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`block px-3 py-1 text-sm rounded-md transition-colors ${
                          location.pathname === subItem.href
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Quick Action */}
        <div className="p-4 border-t">
          <Link
            to="/admin/jobs/create"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500">JobBoard Admin</p>
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
