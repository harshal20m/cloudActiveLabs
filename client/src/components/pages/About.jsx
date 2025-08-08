import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Award,
  Heart,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Building,
  Briefcase,
  Shield,
} from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: "500+",
      color: "text-blue-600",
    },
    {
      icon: Building,
      label: "Partner Companies",
      value: "100+",
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Job Seekers",
      value: "10K+",
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "95%",
      color: "text-orange-600",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To connect talented individuals with meaningful career opportunities and help companies find the perfect candidates to drive their success.",
    },
    {
      icon: Heart,
      title: "Our Vision",
      description:
        "To create a world where everyone finds fulfilling work that matches their skills, passion, and career goals.",
    },
    {
      icon: Shield,
      title: "Our Values",
      description:
        "Transparency, integrity, innovation, and dedication to creating positive impact in the lives of job seekers and employers.",
    },
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Connect with opportunities from companies worldwide, from startups to Fortune 500 enterprises.",
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description:
        "Smart matching algorithms that understand your skills and career preferences.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "All job postings are verified and companies are thoroughly vetted for legitimacy.",
    },
  ];

  const milestones = [
    {
      year: "2024",
      event: "JobBoard platform launched",
      description: "Started with a vision to revolutionize job searching",
    },
    {
      year: "2024",
      event: "First 1,000 users",
      description: "Reached our first major milestone of user registration",
    },
    {
      year: "2024",
      event: "100+ Companies joined",
      description: "Partnered with leading companies across various industries",
    },
    {
      year: "2025",
      event: "AI-powered matching",
      description: "Introduced advanced AI algorithms for better job matching",
    },
  ];

  const team = [
    {
      name: "HM",
      role: "Founder & CEO",
      description: "Passionate about connecting talent with opportunities",
      link: "https://harshalmali.online",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About JobBoard</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              We're on a mission to transform the way people find jobs and
              companies discover talent. Built with modern technology and a deep
              understanding of the recruitment landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Explore Jobs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${stat.color} mx-auto mb-4`}>
                    <stat.icon className="w-full h-full" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values and mission shape everything we do at JobBoard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  JobBoard was born from a simple observation: the job search
                  process was broken for both candidates and employers.
                  Traditional job boards were cluttered, impersonal, and failed
                  to create meaningful connections.
                </p>
                <p>
                  We set out to build something different - a platform that
                  prioritizes user experience, leverages modern technology, and
                  focuses on quality over quantity. Every feature we develop is
                  designed with real users in mind.
                </p>
                <p>
                  Today, JobBoard serves thousands of job seekers and hundreds
                  of companies, facilitating meaningful career connections every
                  day. We're proud to be part of so many success stories.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Our Journey
              </h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full flex-shrink-0">
                      {milestone.year}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {milestone.event}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose JobBoard?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another job board. Here's what sets us apart from
              the competition.
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

      {/* Meet the Team */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind JobBoard who work tirelessly to
              connect talent with opportunity.
            </p>
          </div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm text-center max-w-sm"
              >
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-4">{member.description}</p>
                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect career
            match through JobBoard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Browse All Jobs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
