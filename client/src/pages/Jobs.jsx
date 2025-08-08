import React from "react";
import JobListings from "./JobListings";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section for Jobs Page */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Browse All Jobs</h1>
          <p className="text-xl text-primary-100">
            Discover your next career opportunity from our curated job listings
          </p>
        </div>
      </div>

      {/* Your existing JobListings component */}
      <div className="bg-white">
        <JobListings />
      </div>
    </div>
  );
};

export default Jobs;
