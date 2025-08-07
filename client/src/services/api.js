import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
};

export const jobAPI = {
  getJobs: (params) => api.get("/jobs", { params }),
  getAllJobsForAdmin: (params) => api.get("/jobs/admin/all", { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post("/jobs", data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  toggleJobStatus: (id) => api.patch(`/jobs/${id}/toggle-status`), // ✅ NEW
};

export const applicationAPI = {
  submitApplication: (jobId, data) => api.post(`/apply/${jobId}`, data),
  getApplications: () => api.get("/apply"),
  getMyApplications: (email) => api.get(`/apply/my/${email}`),
  updateStatus: (id, status) => api.patch(`/apply/${id}/status`, { status }),
};

export default api;
