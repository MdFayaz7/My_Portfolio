const isProd = import.meta.env.PROD || window.location.hostname !== "localhost";

export const API_URL = isProd ? "/api" : (import.meta.env.VITE_API_URL || "http://localhost:10000/api");
export const BASE_URL = API_URL.replace("/api", "");
