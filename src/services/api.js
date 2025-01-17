const BASE_URL = "https://api.spacexdata.com/v3/launches";

export const fetchLaunches = async (offset = 0, limit = 10) => {
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};
