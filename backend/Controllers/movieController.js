import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";
import { fetchFromTMDB } from "../services/tmdbService.js";

const cache = new NodeCache({ stdTTL: 3600 });

const getMovies = (endpoint) => {
  return asyncHandler(async (req, res) => {
    const { page = 1, name, append_to_response = "" } = req.query || {};
    const url = typeof endpoint === "function" ? endpoint(req) : endpoint;

    const cacheKey = req.originalUrl;
    const cached = cache.get(cacheKey);
    if (cached) return res.status(200).json(cached);

    const { ok, status, result } = await fetchFromTMDB(url, {
      page,
      query: name,
      append_to_response,
    });

    if (ok) cache.set(cacheKey, result);
    res.status(status).json(result);
  });
};

export default getMovies;
