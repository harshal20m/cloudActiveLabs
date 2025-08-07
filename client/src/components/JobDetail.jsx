import React from "react";
import {
  MapPin,
  Building,
  Clock,
  DollarSign,
  Users,
  Globe,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const JobDetail = ({ job }) => {
  const formatSalary = (salary) => {
    if (!salary?.min && !salary?.max) return null;
    const format = (num) => new Intl.NumberFormat().format(num);

    if (salary.min && salary.max) {
      return `${salary.currency} ${format(salary.min)} - ${format(salary.max)}`;
    }
    return `${salary.currency} ${format(salary.min || salary.max)}+`;
  };

  const getTypeColor = (type) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800",
      "part-time": "bg-blue-100 text-blue-800",
      contract: "bg-purple-100 text-purple-800",
      internship: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Building className="w-5 h-5" />
                <span className="text-lg">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
                {job.remote && (
                  <span className="text-primary-600">(Remote)</span>
                )}
              </div>
            </div>
          </div>

          <Link
            to={`/apply/${job._id}`}
            className="btn-primary px-8 py-3 text-lg"
          >
            Apply Now
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <div className="text-sm text-gray-600">Job Type</div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getTypeColor(
                job.type
              )}`}
            >
              {job.type.replace("-", " ").toUpperCase()}
            </span>
          </div>

          {formatSalary(job.salary) && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <div className="text-sm text-gray-600">Salary</div>
              <div className="font-medium">{formatSalary(job.salary)}</div>
            </div>
          )}

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Globe className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <div className="text-sm text-gray-600">Remote</div>
            <div className="font-medium">{job.remote ? "Yes" : "No"}</div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <div className="text-sm text-gray-600">Posted</div>
            <div className="font-medium">
              {new Date(job.postedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed mb-8">
            {job.description}
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2 mb-8">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="border-t pt-6">
          <div className="flex gap-4">
            <Link to={`/apply/${job._id}`} className="btn-primary px-8 py-3">
              Apply for this Position
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn-secondary px-6 py-3"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
