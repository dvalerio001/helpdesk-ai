import Snippet from "../models/Snippet.js";

// GET /api/snippets (current user's snippets)
async function listSnippets(req, res, next) {
  try {
    const docs = await Snippet.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(docs);
  } catch (err) {
    next(err);
  }
}

// POST /api/snippets
async function createSnippet(req, res, next) {
  try {
    const { title, body, tags = [] } = req.body;
    const doc = await Snippet.create({
      owner: req.user._id,
      title,
      body,
      tags,
    });
    res.status(201).json({
      _id: doc._id,
      owner: doc.owner,
      title: doc.title,
      body: doc.body,
      tags: doc.tags,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/snippets/:id  (only if you own it)
async function deleteSnippet(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Snippet.findOneAndDelete({ _id: id, owner: req.user._id });
    if (!deleted) {
      const error = new Error("Snippet not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(204).send(); // no content
  } catch (err) {
    next(err);
  }
}

export { listSnippets, createSnippet, deleteSnippet };