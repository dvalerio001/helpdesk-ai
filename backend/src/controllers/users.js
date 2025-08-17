import User from "../models/User.js";

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user._id).select("_id name email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}
