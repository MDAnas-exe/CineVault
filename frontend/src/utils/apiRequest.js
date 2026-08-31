const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export default async function apiRequest({
  data,
  endpoint,
  method = "POST",
  signal,
}) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...(method !== "GET" &&
      method !== "DELETE" && { body: JSON.stringify(data) }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json();
    if (response.status >= 500) {
      throw new Error("Something went wrong. Please try again later");
    }
    const e = new Error(err.message);
    e.status = response.status;
    throw e;
  }

  if (response.status === 204) return null;
  const result = await response.json();
  return result;
}
