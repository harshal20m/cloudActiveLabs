import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobAPI } from "../services/api";
import JobDetail from "../components/JobDetail";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getJob(id);
        setJob(response.data);
      } catch (error) {
        const message = error.response?.data?.message || "Job not found";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 sm:h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
        <p className="text-gray-600 mb-6">
          {error || "The job you are looking for does not exist."}
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JobDetail job={job} />
    </div>
  );
};

export default JobDetails;
