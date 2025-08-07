import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-domain.com"]
        : ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applicationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
