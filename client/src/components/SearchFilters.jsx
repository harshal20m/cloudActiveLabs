import React from "react";
import { Search, MapPin, Briefcase, X } from "lucide-react";
import { useJob } from "../context/JobContext";

const SearchFilters = ({ onSearch }) => {
  const { state, dispatch } = useJob();
  const { filters } = state;

  const handleFilterChange = (key, value) => {
    dispatch({ type: "SET_FILTERS", payload: { [key]: value } });
  };

  const handleClearFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
    onSearch({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="card p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs, companies..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="input-field pl-10 appearance-none"
            >
              <option value="">All Job Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Search Jobs
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn-secondary flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
