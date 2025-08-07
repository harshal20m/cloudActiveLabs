import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import User from "../models/User.js";
import connectDB from "../config/database.js";

dotenv.config();

const sampleJobs = [
  {
    title: "Senior Full Stack Developer",
    company: "TechNova India",
    location: "Bangalore, Karnataka",
    description: `We are seeking a seasoned Full Stack Developer to lead the development of our scalable web applications using MERN stack.

Key Responsibilities:
• Build robust and scalable software solutions
• Mentor junior developers
• Collaborate with cross-functional teams
• Ensure code quality through reviews

Benefits:
• Competitive salary in INR
• Flexible work hours
• Remote-friendly culture
• Health insurance and learning budget`,
    requirements: [
      "5+ years of full-stack development experience",
      "Expertise in React, Node.js, MongoDB",
      "Experience with AWS or GCP",
      "Strong knowledge of RESTful APIs",
      "Good understanding of version control (Git)",
      "Excellent problem-solving ability",
    ],
    salary: {
      min: 2500000,
      max: 4000000,
      currency: "INR",
    },
    type: "full-time",
    remote: true,
    isActive: true,
  },
  {
    title: "Frontend React Developer",
    company: "StartUpDesi",
    location: "Mumbai, Maharashtra",
    description: `Join our growing startup as a Frontend Developer. You'll be responsible for building fast, accessible, and responsive interfaces.

Roles:
• Implement UI using React and Tailwind
• Collaborate with designers and backend team
• Optimize app for performance

Culture:
• Dynamic, energetic team
• Startup learning experience
• Career growth and mentorship`,
    requirements: [
      "2+ years of experience with React",
      "Strong grasp of JavaScript and TypeScript",
      "Familiarity with Redux or Context API",
      "Good understanding of responsive design",
      "Experience with Git and Agile workflows",
    ],
    salary: {
      min: 800000,
      max: 1200000,
      currency: "INR",
    },
    type: "full-time",
    remote: false,
    isActive: true,
  },
  {
    title: "Backend Node.js Developer",
    company: "DataBridge India",
    location: "Hyderabad, Telangana",
    description: `We are hiring a backend engineer to help build scalable APIs and backend systems.

Job Duties:
• Write secure, scalable Node.js APIs
• Work with MongoDB and PostgreSQL
• Collaborate on microservices design
• Maintain best security and performance practices`,
    requirements: [
      "3+ years of backend development",
      "Expertise in Node.js and Express.js",
      "Experience with MongoDB/PostgreSQL",
      "Good grasp of Docker, REST APIs",
      "Experience with deployment tools (CI/CD)",
    ],
    salary: {
      min: 1200000,
      max: 2000000,
      currency: "INR",
    },
    type: "full-time",
    remote: true,
    isActive: true,
  },
  {
    title: "DevOps Engineer",
    company: "CloudOps Bharat",
    location: "Pune, Maharashtra",
    description: `Looking for a DevOps expert to manage CI/CD pipelines and cloud infrastructure.

Responsibilities:
• Manage deployments using CI/CD
• Automate infrastructure using Terraform
• Implement monitoring and security tools

Perks:
• Remote work
• Annual bonuses
• Technical certifications covered`,
    requirements: [
      "2+ years of DevOps experience",
      "Hands-on with AWS and Docker",
      "Experience with Terraform or Ansible",
      "Knowledge of Linux scripting",
      "Good understanding of monitoring tools like Prometheus",
    ],
    salary: {
      min: 1000000,
      max: 1800000,
      currency: "INR",
    },
    type: "full-time",
    remote: true,
    isActive: true,
  },
  {
    title: "Junior Web Developer",
    company: "WebCrafters India",
    location: "Jaipur, Rajasthan",
    description: `An entry-level position for passionate developers. Learn and grow while working on real client projects.

Training:
• Frontend and backend mentorship
• Exposure to HTML, CSS, JS, React
• Real client projects from day one`,
    requirements: [
      "0-1 years of experience",
      "Basic HTML/CSS/JavaScript knowledge",
      "Willingness to learn React or Vue",
      "Good communication and problem-solving skills",
    ],
    salary: {
      min: 300000,
      max: 500000,
      currency: "INR",
    },
    type: "full-time",
    remote: false,
    isActive: true,
  },
  {
    title: "UI/UX Designer",
    company: "Design Studio India",
    location: "Kochi, Kerala",
    description: `We are looking for a creative UI/UX designer who can turn ideas into functional and aesthetic interfaces.

Job Scope:
• Design wireframes and mockups
• Work closely with frontend team
• Conduct user testing and feedback loops`,
    requirements: [
      "2+ years in UI/UX design",
      "Experience with Figma, Adobe XD",
      "Basic HTML/CSS understanding",
      "Strong visual and communication skills",
    ],
    salary: {
      min: 600000,
      max: 1000000,
      currency: "INR",
    },
    type: "full-time",
    remote: true,
    isActive: true,
  },
];

const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@jobboard.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    await Job.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data");

    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    const createdJobs = await Job.insertMany(sampleJobs);
    console.log(`Created ${createdJobs.length} jobs`);

    console.log("Database seeded successfully!");
    console.log("\nSample data includes:");
    console.log("- 10 diverse job listings");
    console.log("- 2 users (1 admin, 1 regular user)");
    console.log("\nAdmin credentials:");
    console.log("Email: admin@jobboard.com");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
