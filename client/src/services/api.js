import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const jobAPI = {
  getJobs: (params) => api.get("/jobs", { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post("/jobs", data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

export const applicationAPI = {
  submitApplication: (jobId, data) => api.post(`/apply/${jobId}`, data),
  getApplications: () => api.get("/apply"),
  updateStatus: (id, status) => api.patch(`/apply/${id}/status`, { status }),
};

export default api;
