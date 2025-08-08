# Job Board App

A simple full-stack Job Board application built with **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **MongoDB** for database operations.

## 🚀 Features

### Frontend (React.js + Vite)

- Display a list of jobs with:
  - Job title
  - Company name
  - Location
  - Short description
- Search functionality (filter by keyword or location)
- Apply Form with:
  - Name
  - Email
  - Resume URL (or file upload option)
- Routes:
  - `/` → Job listings
  - `/apply/:jobId` → Apply to a job
- **Bonus**:
  - React Router for navigation
  - State management with Context API

### Backend (Node.js + Express)

- **Routes:**
  - `GET /jobs` → Get all job listings
  - `POST /jobs` → Add a new job (admin-only)
  - `PUT /jobs/:id` → Edit a job (admin-only)
  - `DELETE /jobs/:id` → Delete a job (admin-only)
  - `POST /apply/:jobId` → Submit a job application
- JWT-based admin authentication (Bonus)

### Database (MongoDB)

- Collections:
  - `jobs`
  - `applications`

---

## 🛠 Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React Icons

**Backend:**

- Node.js
- Express
- MongoDB (Mongoose)
- CORS
- Dotenv
- BcryptJS
- JSON Web Token
- Express Validator

**Dev Tools:**

- Nodemon
- ESLint

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/job-board-app.git
cd job-board-app
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

- Create a `.env` file in the `server/` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- Start the backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

- Create a `.env` file in the `client/` folder and add:

```
VITE_API_URL=http://localhost:5000/api
```

- Start the frontend:

```bash
npm run dev
```

---

## 📡 API Documentation

### Jobs

- `GET /api/jobs` → Fetch all jobs
- `POST /api/jobs` → Create a job _(Admin only)_
- `PUT /api/jobs/:id` → Update a job _(Admin only)_
- `DELETE /api/jobs/:id` → Delete a job _(Admin only)_

### Applications

- `POST /api/apply/:jobId` → Apply for a job

---

## 📂 Folder Structure

```
job-board-app/
│── client/        # React frontend
│── server/        # Express backend
│── .gitignore
│── README.md
│── package.json
```

---
