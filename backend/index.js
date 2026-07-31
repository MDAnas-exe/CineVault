import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import movieRouter from "./routes/movieRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";

connectDB();

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: `http://localhost:5173`, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "API endpoint is connected and working!" });
});

app.use(`/auth`, authRouter);
app.use(`/movies`, movieRouter);
app.use("/users", userRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
