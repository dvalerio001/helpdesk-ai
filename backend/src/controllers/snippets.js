import Snippet from "../models/Snippet.js";

/** GET /api/snippets */
export async function listMine(req, res, next) {
  try {
    const ownerId = req.user?._id;
    const docs = await Snippet.find({ owner: ownerId }).sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err) {
    return next(err);
  }
}

/** POST /api/snippets  (route validates { title, content }) */
export async function create(req, res, next) {
  try {
    const ownerId = req.user?._id;
    const { title, content, tags = [] } = req.body; // map content -> body
    const doc = await Snippet.create({
      title,
      body: content,
      tags,
      owner: ownerId,
    });
    return res.status(201).json(doc);
  } catch (err) {
    return next(err);
  }
}

/** DELETE /api/snippets/:id  (route validates :id) */
export async function remove(req, res, next) {
  try {
    const ownerId = req.user?._id;
    const { id } = req.params;
    const doc = await Snippet.findOne({ _id: id, owner: ownerId });
    if (!doc) return res.status(404).json({ error: "Not found" });
    await doc.deleteOne();
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
}
