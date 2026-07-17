import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import movieRouter from "../backend/Routes/moviesRoute.js";
import usersRouter from "../backend/Routes/usersRouter.js";
import connectDB from "./Config/db.js";
import errorHandler from "./Middlewares/errorMiddleware.js";

connectDB();
const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later.",
});

app.use(helmet());
app.use(cors({ origin: `http://localhost:5173` }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(limiter);
app.get("/", (req, res, next) => {
  res.json({ message: "API endpoint is connected and working!" });
});

app.use(`/users`, usersRouter);
app.use(`/movies`, movieRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
