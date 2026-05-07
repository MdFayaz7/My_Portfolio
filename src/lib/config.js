export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:10000/api");
export const BASE_URL = API_URL.replace("/api", "");
