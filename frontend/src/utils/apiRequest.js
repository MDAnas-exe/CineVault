export default async function apiRequest({ data, endpoint, method = "POST" }) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...(method !== "GET" &&
      method !== "DELETE" && { body: JSON.stringify(data) }),
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

  return await response.json();
}
