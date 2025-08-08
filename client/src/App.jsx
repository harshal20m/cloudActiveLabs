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

import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/Profile";

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
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:id" element={<JobDetails />} />
                <Route path="apply/:jobId" element={<ApplyJob />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                {/* Routes under development */}

                <Route path="profile" element={<ProfilePage />} />
                <Route
                  path="my-applications"
                  element={<MyApplicationsPage />}
                />
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

                <Route
                  path="notifications"
                  element={<FeatureInDevelopment />}
                />
                <Route path="profile" element={<ProfilePage />} />
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
          <p>
            &copy; 2025 JobBoard by :{" "}
            <a
              href="https://harshalmali.online"
              className="text-blue-700 underline"
            >
              <strong>HM</strong>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
