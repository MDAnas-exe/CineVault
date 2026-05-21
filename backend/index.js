import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";
const app = express();
const port = 3000;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDBtoken,
  },
};
app.use(helmet());
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 3600 });
app.get("/", (req, res, next) => {
  res.json({ message: "API endpoint is connected and working!" });
});
app.get("/movies/search", async (req, res, next) => {
  try {
    let {
      name,
      include_adult = false,
      language = "en-US",
      page = 1,
    } = req.query;
    if (!name || name.trim().length === 0)
      throw new Error("Invalid movie name");

    page = parseInt(page);
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=${include_adult}&language=${language}&page=${page}`,
      options,
    );
    let result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    next(new Error(error.message || "Failed to fetch movies"));
  }
});

app.get("/movies/trending", async (req, res, next) => {
  try {
    const cached = cache.get("trending");
    if (cached) return res.json(cached);

    let { language = "en-US" } = req.query;

    let response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?language=${language}`,
      options,
    );
    let result = await response.json();
    if (response.ok) cache.set("trending", result);
    res.status(response.status).json(result);
  } catch (error) {
    next(new Error("Failed to fetch trending movies"));
  }
});

app.get("/movies/top_rated", async (req, res, next) => {
  try {
    const cached = cache.get("top_rated");
    if (cached) return res.json(cached);

    let { language = "en-US" } = req.query;

    let response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=${language}`,
      options,
    );
    let result = await response.json();
    if (response.ok) cache.set("top_rated", result);
    res.status(response.status).json(result);
  } catch (error) {
    next(new Error("Failed to fetch top rated  movies"));
  }
});

app.get("/movie/:id", async (req, res, next) => {
  try {
    let { language = "en-US" } = req.query;
    let { id } = req.params;
    const cached = cache.get(`movieDetails${id}`);
    if (cached) return res.json(cached);

    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=${language}&append_to_response=credits,videos,release_dates`,
      options,
    );
    let result = await response.json();
    if (response.ok) cache.set(`movieDetails${id}`, result);
    res.status(response.status).json(result);
  } catch (error) {
    next(new Error("Failed to fetch Movie Details Page"));
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) =>
  res.status(err.status || 500).json({ message: err.message }),
);
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
