const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const fetchFromTMDB = async (endpoint, params = {}) => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  }

  const queryString = query.toString();
  const url = `${TMDB_BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;

  const token = process.env.TMDBtoken || "";
  const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: authHeader,
    },
  });

  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    result,
  };
};
