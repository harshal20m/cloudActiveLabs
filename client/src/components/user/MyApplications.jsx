import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ExternalLink,
  Filter,
  Search,
  MapPin,
  Building,
} from "lucide-react";
import { applicationAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getMyApplications(user.email);
      setApplications(response.data);
    } catch (error) {
      toast.error("Failed to fetch applications");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobId?.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      reviewed: { bg: "bg-blue-100", text: "text-blue-800", icon: Eye },
      accepted: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    };

    const style = styles[status] || styles.pending;
    const IconComponent = style.icon;

    return (
      <div className="flex items-center space-x-1">
        <IconComponent className="w-4 h-4" />
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${style.bg} ${style.text}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    );
  };

  const getStatusMessage = (status) => {
    const messages = {
      pending: "Your application is being reviewed. We'll update you soon!",
      reviewed:
        "Your application has been reviewed and is under consideration.",
      accepted: "Congratulations! Your application has been accepted.",
      rejected:
        "Unfortunately, your application was not selected for this position.",
    };
    return messages[status] || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">
            Track the status of your job applications and stay updated on your
            progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Applications",
              value: applications.length,
              color: "text-blue-600",
            },
            {
              label: "Pending",
              value: applications.filter((app) => app.status === "pending")
                .length,
              color: "text-yellow-600",
            },
            {
              label: "Under Review",
              value: applications.filter((app) => app.status === "reviewed")
                .length,
              color: "text-blue-600",
            },
            {
              label: "Accepted",
              value: applications.filter((app) => app.status === "accepted")
                .length,
              color: "text-green-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {applications.length === 0
                ? "No Applications Yet"
                : "No Applications Found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {applications.length === 0
                ? "You haven't applied to any jobs yet. Start browsing and find your dream job!"
                : "No applications match your current filters. Try adjusting your search criteria."}
            </p>
            <Link to="/" className="btn-primary inline-flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {application.jobId?.title ||
                              "Job Title Not Available"}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {application.jobId?.company ||
                                "Company Not Available"}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {application.jobId?.location ||
                                "Location Not Available"}
                              {application.jobId?.remote && (
                                <span className="ml-1 text-primary-600">
                                  (Remote)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="ml-4">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Applied on{" "}
                          {new Date(application.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>

                        <p className="text-sm text-gray-700">
                          {getStatusMessage(application.status)}
                        </p>
                      </div>

                      {application.coverLetter && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Cover Letter:
                          </h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md line-clamp-3">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
                    <Link
                      to={`/jobs/${application.jobId?._id}`}
                      className="btn-secondary flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Job Details
                    </Link>

                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resume
                    </a>

                    {application.status === "rejected" &&
                      application.jobId?.isActive && (
                        <Link
                          to={`/apply/${application.jobId._id}`}
                          className="btn-primary flex items-center justify-center"
                        >
                          Apply Again
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Application Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Follow Up</h4>
              <p className="text-gray-600">
                It's okay to follow up on pending applications after 1-2 weeks
                if you haven't heard back.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Keep Applying</h4>
              <p className="text-gray-600">
                Don't put all your eggs in one basket. Keep applying to multiple
                positions to increase your chances.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Update Your Resume
              </h4>
              <p className="text-gray-600">
                Regularly update your resume with new skills and experiences to
                stay competitive.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Stay Positive</h4>
              <p className="text-gray-600">
                Job searching can be challenging. Stay positive and keep
                improving your application materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
