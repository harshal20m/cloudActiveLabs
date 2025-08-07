import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobAPI, applicationAPI } from "../services/api";
import ApplicationForm from "../components/ApplicationForm";
import toast from "react-hot-toast";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobAPI.getJob(jobId);
        setJob(response.data);
      } catch (error) {
        toast.error("Job not found");
        navigate("/");
      } finally {
        setJobLoading(false);
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      await applicationAPI.submitApplication(jobId, formData);
      toast.success("Application submitted successfully!");
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to submit application";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ApplicationForm job={job} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default ApplyJob;
