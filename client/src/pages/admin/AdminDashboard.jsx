import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Building,
} from "lucide-react";
import { jobAPI, applicationAPI } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [jobsRes, applicationsRes] = await Promise.all([
        jobAPI.getJobs({ limit: 50 }),
        applicationAPI.getApplications(),
      ]);

      const jobs = jobsRes.data.jobs;
      const applications = applicationsRes.data;

      setStats({
        totalJobs: jobs.length,
        activeJobs: jobs.filter((job) => job.isActive).length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(
          (app) => app.status === "pending"
        ).length,
      });

      setRecentJobs(jobs.slice(0, 5));
      setRecentApplications(applications.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = "blue" }) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
    };

    return (
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">
          Monitor your job board performance and activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={Briefcase}
          color="blue"
        />
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={FileText}
          color="orange"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingApplications}
          icon={Clock}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Job Postings
          </h2>

          <div className="space-y-4">
            {recentJobs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No jobs posted yet
              </p>
            ) : (
              recentJobs.map((job) => (
                <div
                  key={job._id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(job.postedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Applications
          </h2>

          <div className="space-y-4">
            {recentApplications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No applications received yet
              </p>
            ) : (
              recentApplications.map((application) => (
                <div
                  key={application._id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {application.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.email}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        application.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    Applied for: {application.jobId?.title || "Job not found"}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(application.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
