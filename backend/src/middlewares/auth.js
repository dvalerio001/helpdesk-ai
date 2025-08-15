import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-me";

function auth(req, res, next) {
  try {
    const header = req.get("Authorization") || "";
    const [, token] = header.split(" ");

    if (!token) {
      const err = new Error("Authorization required");
      err.statusCode = 401;
      throw err;
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { _id: payload._id };
    next();
  } catch (err) {
    err.statusCode = err.statusCode || 401;
    next(err);
  }
}

export default auth;