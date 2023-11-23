import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { connectToDb } from "./db.js";
import passport from "passport";
import goolgeAuthRoutes from "./routes/googleAuth.js";

const app = express();
const PORT = process.env.PORT || 5700;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/googleAuth", goolgeAuthRoutes);
app.get("/api/success",(req,res)=>{
  res.send("Login successful.")
})
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  connectToDb();
});
