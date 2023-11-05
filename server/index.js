import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { connectToDb } from "./db.js";

const app = express();
const PORT = process.env.PORT || 5700;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
});
