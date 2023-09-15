export const getBaseApiUrl = () => {
  return import.meta.env.API_URL || "http://localhost:3001";
};
