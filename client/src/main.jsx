import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const AppWithHealthCheck = () => {
  const [serverReady, setServerReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("/health");
        const data = await response.json();

        if (data.status === "OK") {
          setServerReady(true);
        }
      } catch (error) {
        console.error("Health check failed:", error);
        // Continue anyway after 5 seconds
        setTimeout(() => setServerReady(true), 5000);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-900">
            Loading JobBoard...
          </h2>
        </div>
      </div>
    );
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithHealthCheck />
  </React.StrictMode>
);
