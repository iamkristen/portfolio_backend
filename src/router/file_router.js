const router = require("express").Router();
const upload = require("./../middleware/file_upload");
const { verify } = require("../middleware/authentication");

const fs = require("fs");
const path = require("path");

router.post("/single", verify, upload.single("image"), async (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    res.json({ success: false, error: "File not found." });
    return;
  }
  res.json({ success: true, data: process.env.HOST + uploadedFile.filename });
});

router.post("/multiple", verify, upload.array("images"), async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const limit = 5;
    if (uploadedFiles.length > limit) {
      res.json({ success: false, error: `only ${limit} images allowed.` });
      return;
    }
    if (!uploadedFiles || uploadedFiles.length == 0) {
      res.json({ success: false, error: "Files not found" });
      return;
    }
    var downloadUrls = [];
    uploadedFiles.forEach((file) => {
      const uploaded = process.env.HOST + file.filename;
      downloadUrls.push(uploaded);
    });
    res.json({ success: true, data: downloadUrls });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

router.post("/delete", verify, async (req, res) => {
  try {
    var filename = req.body.filename;

    const filePath = path.join(__dirname, "../../uploads", filename); // Replace with the actual file path

    // Check if the file exists before attempting to delete it
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          res.json({ success: false, error: err });
        } else {
          res.json({ success: true, data: "File Deleted successfully." });
        }
      });
    } else {
      res.json({ success: false, error: "File not found." });
    }
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

module.exports = router;
