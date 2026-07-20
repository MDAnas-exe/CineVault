import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDBtoken,
  },
};

const getMovies = (endpoint) => {
  return asyncHandler(async (req, res) => {
    const { page = 1, name, append_to_response = "" } = req.query || {};
    const url = typeof endpoint === "function" ? endpoint(req) : endpoint;

    const cacheKey = req.originalUrl;
    const cached = cache.get(cacheKey);
    if (cached) return res.status(200).json(cached);

    if (req.path === "/search" && !name) throw new Error("Invalid query");

    const query = new URLSearchParams({
      ...(name && { query: name }),
      page,
      ...(append_to_response && { append_to_response }),
    }).toString();

    const response = await fetch(
      `https://api.themoviedb.org/3/${url}?${query}`,
      options,
    );
    const result = await response.json();

    if (response.ok) cache.set(cacheKey, result);
    res.status(response.status).json(result);
  });
};

export default getMovies;
