export const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : process.env.JWT_SECRET || "dev-secret";

export const JWT_EXPIRES_IN = "7d";
