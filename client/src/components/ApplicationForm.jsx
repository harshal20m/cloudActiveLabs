import React, { useState } from "react";
import { User, Mail, Link, FileText } from "lucide-react";
import toast from "react-hot-toast";

const ApplicationForm = ({ job, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.resumeUrl.trim()) {
      newErrors.resumeUrl = "Resume URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.resumeUrl)) {
      newErrors.resumeUrl = "Please enter a valid URL";
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

    try {
      await onSubmit(formData);
      setFormData({ name: "", email: "", resumeUrl: "", coverLetter: "" });
      setErrors({});
    } catch (error) {
      console.error("Application submission failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="card p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Apply for {job.title}
        </h2>
        <p className="text-gray-600">
          at {job.company} • {job.location}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? "border-red-500" : ""}`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Link className="inline w-4 h-4 mr-1" />
            Resume URL *
          </label>
          <input
            type="url"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            className={`input-field ${
              errors.resumeUrl ? "border-red-500" : ""
            }`}
            placeholder="https://drive.google.com/..."
          />
          {errors.resumeUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.resumeUrl}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Upload your resume to Google Drive, Dropbox, or similar service and
            paste the public link
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-1" />
            Cover Letter (Optional)
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Tell us why you're interested in this position..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
