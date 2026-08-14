import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";
import reviewModel from "../models/reviewModel.js";

const cache = new NodeCache({ stdTTL: 3600 });

const getMovies = (endpoint) => {
  return asyncHandler(async (req, res) => {
    const { page = 1, name, append_to_response } = req.query || {};
    const url = typeof endpoint === "function" ? endpoint(req) : endpoint;

    const defaultAppend =
      typeof url === "string" && /^movie\/\d+$/.test(url) ? "videos" : "";
    const appendToResponse = append_to_response || defaultAppend;

    const cacheKey = req.originalUrl;
    const cached = cache.get(cacheKey);
    if (cached) return res.status(200).json(cached);

    const query = new URLSearchParams({
      ...(name && { query: name }),
      page,
      ...(appendToResponse && { append_to_response: appendToResponse }),
    }).toString();

    const token = process.env.TMDBtoken || "";
    const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    const response = await fetch(
      `https://api.themoviedb.org/3/${url}?${query}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: authHeader,
        },
      },
    );

    const result = await response.json();

    if (response.ok) cache.set(cacheKey, result);
    res.status(response.status).json(result);
  });
};

const getMovieReviews = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.id);
  const { page = 1 } = req.query;
  const pageNum = parseInt(page);
  const limit = 10;

  const [reviews, totalResults] = await Promise.all([
    reviewModel
      .find({ movie: movieId })
      .select("name review createdAt -_id")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((pageNum - 1) * limit)
      .lean(),
    reviewModel.countDocuments({ movie: movieId }),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  res.status(200).json({
    reviews,
    page: pageNum,
    totalPages,
    totalResults,
  });
});

export { getMovieReviews };
export default getMovies;
