import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { JobProvider } from "./context/JobContext";
import { AuthProvider } from "./context/AuthContext";

import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobManagement from "./components/admin/JobManagement";
import CreateJob from "./pages/admin/CreateJob";
import EditJob from "./pages/admin/EditJob";
import Applications from "./pages/admin/Applications";

// New components
import FeatureInDevelopment from "./components/common/FeatureInDevelopment";
import NotFound from "./components/common/NotFound";
import Navbar from "./components/layout/Navbar";
import MyApplicationsPage from "./pages/MyApplications";

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginForm />} />

              <Route path="/" element={<PublicLayout />}>
                <Route index element={<JobListings />} />
                <Route path="jobs/:id" element={<JobDetails />} />
                <Route path="apply/:jobId" element={<ApplyJob />} />
                {/* Routes under development */}
                <Route path="about" element={<FeatureInDevelopment />} />
                <Route path="contact" element={<FeatureInDevelopment />} />
                <Route path="profile" element={<FeatureInDevelopment />} />
                <Route
                  path="my-applications"
                  element={<MyApplicationsPage />}
                />
                <Route path="register" element={<FeatureInDevelopment />} />
                <Route path="jobs" element={<FeatureInDevelopment />} />{" "}
                {/* Alternative jobs route */}
              </Route>

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="jobs" element={<JobManagement />} />
                <Route path="jobs/create" element={<CreateJob />} />
                <Route path="jobs/:id/edit" element={<EditJob />} />
                <Route path="applications" element={<Applications />} />

                {/* Admin routes under development */}
                <Route path="analytics" element={<FeatureInDevelopment />} />
                <Route path="users" element={<FeatureInDevelopment />} />
                <Route path="messages" element={<FeatureInDevelopment />} />
                <Route path="settings" element={<FeatureInDevelopment />} />
                <Route
                  path="notifications"
                  element={<FeatureInDevelopment />}
                />
                <Route path="profile" element={<FeatureInDevelopment />} />
                <Route
                  path="jobs/archived"
                  element={<FeatureInDevelopment />}
                />
              </Route>

              {/* 404 Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#fff",
                  color: "#374151",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

const PublicLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 JobBoard. Built with React, Node.js, and MongoDB.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
