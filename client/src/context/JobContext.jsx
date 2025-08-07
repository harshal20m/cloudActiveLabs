import React, { createContext, useContext, useReducer } from "react";

const JobContext = createContext();

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    location: "",
    type: "",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_JOBS":
      return {
        ...state,
        jobs: action.payload.jobs,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        },
        loading: false,
        error: null,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };

    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};
