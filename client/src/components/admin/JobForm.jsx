import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  List,
  Globe,
  Save,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

const JobForm = ({ job = null, onSubmit, loading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: {
      min: "",
      max: "",
      currency: "INR",
    },
    type: "full-time",
    remote: false,
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        description: job.description || "",
        requirements: job.requirements ? job.requirements.join("\n") : "",
        salary: {
          min: job.salary?.min || "",
          max: job.salary?.max || "",
          currency: job.salary?.currency || "INR",
        },
        type: job.type || "full-time",
        remote: job.remote || false,
        isActive: job.isActive !== undefined ? job.isActive : true,
      });
    }
  }, [job]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }

    if (formData.salary.min && formData.salary.max) {
      if (parseFloat(formData.salary.min) >= parseFloat(formData.salary.max)) {
        newErrors.salary = "Maximum salary must be greater than minimum salary";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const submitData = {
      ...formData,
      requirements: formData.requirements
        ? formData.requirements.split("\n").filter((req) => req.trim())
        : [],
      salary: {
        min: formData.salary.min ? parseFloat(formData.salary.min) : undefined,
        max: formData.salary.max ? parseFloat(formData.salary.max) : undefined,
        currency: formData.salary.currency,
      },
    };

    if (!submitData.salary.min && !submitData.salary.max) {
      delete submitData.salary;
    }

    try {
      await onSubmit(submitData);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("salary.")) {
      const salaryField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          {job ? "Edit Job" : "Create New Job"}
        </h1>
        <p className="text-gray-600 mt-1">
          {job
            ? "Update job details and requirements"
            : "Fill in the details to post a new job"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input-field ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="e.g. Senior React Developer"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline w-4 h-4 mr-1" />
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`input-field ${
                  errors.company ? "border-red-500" : ""
                }`}
                placeholder="e.g. TechCorp Solutions"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`input-field ${
                  errors.location ? "border-red-500" : ""
                }`}
                placeholder="e.g. San Francisco, CA"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <Globe className="ml-2 mr-1 w-4 h-4" />
              <span className="text-sm text-gray-700">
                Remote Work Available
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Active Job Posting
              </span>
            </label>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Salary Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Minimum Salary
              </label>
              <input
                type="number"
                name="salary.min"
                value={formData.salary.min}
                onChange={handleChange}
                className="input-field"
                placeholder="50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Salary
              </label>
              <input
                type="number"
                name="salary.max"
                value={formData.salary.max}
                onChange={handleChange}
                className="input-field"
                placeholder="80000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="salary.currency"
                value={formData.salary.currency}
                onChange={handleChange}
                className="input-field"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
              </select>
            </div>
          </div>

          {errors.salary && (
            <p className="mt-2 text-sm text-red-600">{errors.salary}</p>
          )}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Job Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`input-field resize-none ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Describe the role, responsibilities, company culture, and what makes this position exciting..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <List className="inline w-4 h-4 mr-1" />
                Requirements (One per line)
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={6}
                className="input-field resize-none"
                placeholder={`5+ years of React development experience
Strong knowledge of JavaScript and TypeScript
Experience with state management libraries
Understanding of modern CSS frameworks`}
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter each requirement on a new line. These will be displayed as
                bullet points.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : job ? "Update Job" : "Create Job"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary px-6 py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
