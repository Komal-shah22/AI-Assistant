import multer from "multer";

// Define storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // folder where files will be stored temporarily
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // add timestamp for uniqueness
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
