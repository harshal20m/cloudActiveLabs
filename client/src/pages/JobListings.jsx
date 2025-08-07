import React, { useEffect, useState } from "react";
import { useJob } from "../context/JobContext";
import { jobAPI } from "../services/api";
import JobCard from "../components/JobCard";
import SearchFilters from "../components/SearchFilters";
import toast from "react-hot-toast";

const JobListings = () => {
  const { state, dispatch } = useJob();
  const { jobs, loading, pagination } = state;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async (filters = {}, page = 1) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const params = { ...filters, page, limit: 9 };
      Object.keys(params).forEach((key) => {
        if (params[key] === "") delete params[key];
      });

      const response = await jobAPI.getJobs(params);
      dispatch({ type: "SET_JOBS", payload: response.data });
      setCurrentPage(page);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch jobs";
      dispatch({ type: "SET_ERROR", payload: message });
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (filters) => {
    setCurrentPage(1);
    fetchJobs(filters, 1);
  };

  const handlePageChange = (page) => {
    fetchJobs(state.filters, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 text-sm border rounded-md ${
              currentPage === page
                ? "bg-primary-600 text-white border-primary-600"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600">
          Discover {pagination.total} opportunities from top companies
        </p>
      </div>

      <SearchFilters onSearch={handleSearch} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          <Pagination />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobListings;
