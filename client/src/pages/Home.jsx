import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Briefcase,
  Users,
  Building,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const stats = [
    { label: "Active Jobs", value: "500+", icon: Briefcase },
    { label: "Companies", value: "100+", icon: Building },
    { label: "Job Seekers", value: "10K+", icon: Users },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description:
        "Find relevant opportunities with our advanced search and filtering system",
    },
    {
      icon: CheckCircle,
      title: "Easy Applications",
      description:
        "Apply to multiple jobs quickly with your saved profile and resume",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Discover opportunities that align with your career goals and aspirations",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      message:
        "Found my dream job within 2 weeks! The platform made everything so simple.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "StartupXYZ",
      message: "Great interface and relevant job matches. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Find Your
                <span className="text-primary-200"> Dream Job</span>
                <br />
                Today
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Discover thousands of job opportunities from top companies.
                Start your career journey with us and land your perfect role.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/jobs"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Link>

                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center"
                >
                  Get Started Free
                </Link>
              </div>

              <div className="flex items-center gap-6 text-primary-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Instant alerts</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white/20 rounded-lg p-4 mb-3">
                        <stat.icon className="w-8 h-8 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-primary-200 text-sm">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose JobBoard?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make job searching simple, efficient, and successful with our
              powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}

      {/* CTA Section */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have found their dream careers
            through our platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Start Job Search
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              to="/register"
              className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
