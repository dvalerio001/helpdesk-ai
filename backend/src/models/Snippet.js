import { Schema, model } from "mongoose";

const snippetSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Snippet = model("Snippet", snippetSchema);

export default Snippet;