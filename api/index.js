import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import publisherRouter from "./routes/publisher.route.js";
import ministryRouter from "./routes/ministry.route.js";
import cookieParser from "cookie-parser";
import path from "path";
// import publisherRouter from './routes/publisher.route..js';
dotenv.config();

mongoose
  .connect(process.env.MONGO, { autoIndex: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/publisher", publisherRouter);
app.use("/api/ministry", ministryRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res
    .status(statusCode)
    .json({ success: false, statusCode, message: message });
});
