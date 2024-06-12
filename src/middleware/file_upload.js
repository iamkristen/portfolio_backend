const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");

// Ensure that the uploads directory exists
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const splitName = originalName.split(".");
    const extension = splitName[splitName.length - 1];
    const filename = uuid.v4() + "." + extension;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
