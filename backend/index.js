import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API endpoint is connected and working!" });
});
app.get("/movies/search", async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.TMDBtoken,
      },
    };
    let { name, include_adult, language, page } = req.query;
    page = parseInt(page);
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=${include_adult}&language=${language}&page=${page}`,
      options,
    );
    let result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top rated movies" });
  }
});

app.get("/movies/trending", async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.TMDBtoken,
      },
    };
    let { language = "en-US" } = req.query;

    let response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?language=${language}`,
      options,
    );
    let result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch  trending movies" });
  }
});

app.get("/movies/top_rated", async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.TMDBtoken,
      },
    };
    let { language = "en-US" } = req.query;

    let response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=${language}`,
      options,
    );
    let result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch  top rated movies" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
