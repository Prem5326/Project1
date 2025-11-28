import path from "path";
import Document from "../models/document.model.js";
import fs from "fs";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const file = req.file;
    const doc = await Document.create({
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`, // served by express.static (see index.js)
      uploadedBy: req.user.id,
    });

    res.status(201).json({ message: "Uploaded", document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 }).populate("uploadedBy", "name email");
    res.json({ documents: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not list documents" });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const filePath = path.resolve("uploads", doc.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File missing on server" });

    res.download(filePath, doc.originalName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not download file" });
  }
};
