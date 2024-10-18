import multer from "multer";

// Configure storage in memory
const storage = multer.memoryStorage();

// Set file size limit to 5 MB
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

// Configure the file filter to accept only images
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

export default upload;
