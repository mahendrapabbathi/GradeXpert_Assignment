import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure uploads folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Allowed file types for screenshots (images) and video
const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const allowedVideoTypes = ["video/mp4", "video/mpeg", "video/quicktime"];

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

// File validation
function fileFilter(req, file, cb) {
  if (file.fieldname === "profilePic") {
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed for profilePic!"), false);
    }
  }

  if (file.fieldname === "screenshot") { // changed from "screenshots"
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed for screenshot!"), false);
    }
  }

  if (file.fieldname === "demoVideo") {
    if (!allowedVideoTypes.includes(file.mimetype)) {
      return cb(new Error("Only video files are allowed for demo video!"), false);
    }
  }

  cb(null, true);
}

// Upload config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max per file
    files: 4,  // max 2 files: 1 screenshot + 1 demoVideo
  },
});

export default upload;
