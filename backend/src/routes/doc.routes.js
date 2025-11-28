import express from "express";
import auth from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";
import upload from "../config/multer.js";
import { uploadDocument, listDocuments, downloadDocument } from "../controllers/document.controller.js";

const router = express.Router();

// admin upload
router.post("/upload", auth, isAdmin, upload.single("file"), uploadDocument);

// list documents (any authenticated user)
router.get("/", auth, listDocuments);

// download document by id (authenticated)
router.get("/:id/download", auth, downloadDocument);

export default router;
