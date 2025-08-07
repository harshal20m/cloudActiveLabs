import React from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../../components/admin/JobForm";
import { jobAPI } from "../../services/api";
import toast from "react-hot-toast";

const CreateJob = () => {
  const navigate = useNavigate();

  const handleSubmit = async (jobData) => {
    try {
      await jobAPI.createJob(jobData);
      toast.success("Job created successfully!");
      navigate("/admin/jobs");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create job";
      toast.error(message);
      throw error;
    }
  };

  return <JobForm onSubmit={handleSubmit} />;
};

export default CreateJob;
