import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { JobProvider } from "./context/JobContext";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-primary-600">JobBoard</h1>
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/apply/:jobId" element={<ApplyJob />} />
            </Routes>
          </main>

          <footer className="bg-white border-t mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
              <p>
                &copy; 2024 JobBoard. Built with React, Node.js, and MongoDB.
              </p>
            </div>
          </footer>
        </div>

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
      </Router>
    </JobProvider>
  );
}

export default App;
