import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

import { connectToDb } from "./db.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connect to the database
connectToDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
