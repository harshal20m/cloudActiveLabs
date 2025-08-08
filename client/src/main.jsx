import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const AppWithHealthCheck = () => {
  const [serverReady, setServerReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [showSpinMessage, setShowSpinMessage] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        console.log(`Health check attempt ${retryCount + 1}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout per request

        const response = await fetch("/health", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const data = await response.json();

        if (data.status === "OK") {
          setServerReady(true);
          setLoading(false);
          console.log("✅ Server is ready!");
          return;
        }
      } catch (error) {
        console.error(
          `Health check failed (attempt ${retryCount + 1}):`,
          error.message
        );

        // If it's been more than 10 seconds, show the spin-up message
        if (loadingTime > 10) {
          setShowSpinMessage(true);
        }

        // Continue retrying for up to 2 minutes (120 seconds)
        if (loadingTime < 120) {
          setRetryCount((prev) => prev + 1);
          // Exponential backoff: start with 3s, then 5s, then 8s, then 10s
          const delay = Math.min(3000 + retryCount * 2000, 10000);
          setTimeout(checkHealth, delay);
        } else {
          // After 2 minutes, give up and show the app anyway
          setServerReady(true);
          setLoading(false);
          console.log("⚠️ Server health check timed out, continuing anyway...");
        }
      }
    };

    // Start the health check
    checkHealth();

    // Timer to track loading time
    const timer = setInterval(() => {
      setLoadingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getLoadingMessage = () => {
    if (loadingTime < 10) {
      return "Connecting to server...";
    } else if (loadingTime < 30) {
      return "Server is starting up (free tier)...";
    } else if (loadingTime < 60) {
      return "Still warming up, please be patient...";
    } else {
      return "Almost ready, just a bit longer...";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* Main Spinner */}
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>

            {/* Server icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
          </div>

          {/* Loading Message */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading JobBoard
          </h2>

          <p className="text-gray-600 mb-4">{getLoadingMessage()}</p>

          {/* Timer */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Loading time: {formatTime(loadingTime)}
            </p>
          </div>

          {/* Free Tier Message */}
          {showSpinMessage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-sm font-medium text-blue-800">
                  Free Tier Server
                </h3>
              </div>
              <p className="text-xs text-blue-700">
                Our server runs on a free tier service that spins down when
                inactive. The initial startup can take 50-90 seconds. Thank you
                for your patience!
              </p>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Additional Info */}
          {loadingTime > 30 && (
            <div className="text-left space-y-2">
              <p className="text-xs text-gray-500">
                <strong>What's happening?</strong>
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Free server is spinning up from sleep</li>
                <li>• Database connections are being established</li>
                <li>• API endpoints are initializing</li>
                <li>• Everything will be ready shortly!</li>
              </ul>
            </div>
          )}

          {/* Retry Button (after 60 seconds) */}
          {loadingTime > 60 && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setLoadingTime(0);
                  setRetryCount(0);
                  setShowSpinMessage(false);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                Refresh Page
              </button>
            </div>
          )}

          {/* Skip Option (after 90 seconds) */}
          {loadingTime > 90 && (
            <div className="mt-3">
              <button
                onClick={() => {
                  setServerReady(true);
                  setLoading(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Continue Without Server Check
              </button>
            </div>
          )}
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
