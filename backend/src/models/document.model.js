import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filename: { type: String, required: true }, // stored on disk
  mimeType: { type: String },
  size: { type: Number },
  url: { type: String }, // optional, if you serve via static path
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);
