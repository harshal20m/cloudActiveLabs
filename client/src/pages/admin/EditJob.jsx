import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../../components/admin/JobForm";
import { jobAPI } from "../../services/api";
import toast from "react-hot-toast";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobAPI.getJob(id);
        setJob(response.data);
      } catch (error) {
        toast.error("Job not found");
        navigate("/admin/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleSubmit = async (jobData) => {
    try {
      await jobAPI.updateJob(id, jobData);
      toast.success("Job updated successfully!");
      navigate("/admin/jobs");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update job";
      toast.error(message);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return <JobForm job={job} onSubmit={handleSubmit} />;
};

export default EditJob;
