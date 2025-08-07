import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  Building,
  Clock,
  Power,
  PowerOff,
} from "lucide-react";
import { jobAPI } from "../../services/api";
import toast from "react-hot-toast";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAllJobsForAdmin({ limit: 100 });
      setJobs(response.data.jobs);
    } catch (error) {
      toast.error("Failed to fetch jobs");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this job? This action cannot be undone."
      )
    )
      return;

    try {
      await jobAPI.deleteJob(jobId);
      toast.success("Job permanently deleted successfully");
      fetchJobs();
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Error:", error);
    }
  };

  // ✅ FIXED: Toggle job status function
  const handleToggleStatus = async (job) => {
    try {
      const response = await jobAPI.toggleJobStatus(job._id);
      toast.success(response.data.message);
      fetchJobs(); // Refresh the jobs list
    } catch (error) {
      toast.error("Failed to update job status");
      console.error("Error:", error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && job.isActive) ||
      (statusFilter === "inactive" && !job.isActive);

    const matchesType = !typeFilter || job.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
        Inactive
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const colors = {
      "full-time": "bg-blue-100 text-blue-800",
      "part-time": "bg-purple-100 text-purple-800",
      contract: "bg-orange-100 text-orange-800",
      internship: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          colors[type] || "bg-gray-100 text-gray-800"
        }`}
      >
        {type.replace("-", " ").toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">
            Manage all job postings and applications
          </p>
        </div>

        <Link to="/admin/jobs/create" className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Link>
      </div>

      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Job Details
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Posted
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No jobs found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                            {job.remote && (
                              <span className="text-primary-600">(Remote)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">{getTypeBadge(job.type)}</td>

                    <td className="py-4 px-4">
                      {getStatusBadge(job.isActive)}
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(job.postedAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="View Job"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          to={`/admin/jobs/${job._id}/edit`}
                          className="p-1 text-gray-400 hover:text-primary-600"
                          title="Edit Job"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        {/* ✅ IMPROVED: Better toggle status button */}
                        <button
                          onClick={() => handleToggleStatus(job)}
                          className={`p-1 ${
                            job.isActive
                              ? "text-orange-500 hover:text-orange-700"
                              : "text-green-500 hover:text-green-700"
                          }`}
                          title={
                            job.isActive ? "Deactivate Job" : "Activate Job"
                          }
                        >
                          {job.isActive ? (
                            <PowerOff className="w-4 h-4" />
                          ) : (
                            <Power className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete Job Permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobManagement;
