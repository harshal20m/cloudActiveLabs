import React from "react";
import { MapPin, Building, Clock, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
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
    <div className="card p-6 hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg border border-gray-200 flex flex-col justify-between h-full overflow-hidden">
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors break-words">
            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span className="truncate">{job.company}</span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{job.location}</span>
              {job.remote && (
                <span className="text-primary-600 ml-1">(Remote)</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {job.postedAt
                  ? new Date(job.postedAt).toLocaleDateString()
                  : "Recently"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 whitespace-nowrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
              job.type
            )}`}
          >
            {job.type?.replace("-", " ").toUpperCase()}
          </span>

          {formatSalary(job.salary) && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <IndianRupee className="w-4 h-4" />
              <span>{formatSalary(job.salary)}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 break-words">
        {job.description}
      </p>

      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 max-h-24 overflow-hidden">
            {job.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded break-words"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        <Link
          to={`/apply/${job._id}`}
          className="btn-primary flex-1 text-center truncate"
        >
          Apply Now
        </Link>
        <Link to={`/jobs/${job._id}`} className="btn-secondary truncate">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
