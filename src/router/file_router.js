const router = require("express").Router();
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const { verify } = require("../middleware/authentication");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdK3lsEXQ6WghVf97GssUXCMdQkDsaEG4",
  authDomain: "portfolio-8b6b4.firebaseapp.com",
  projectId: "portfolio-8b6b4",
  storageBucket: "portfolio-8b6b4.appspot.com",
  messagingSenderId: "39827811541",
  appId: "1:39827811541:web:6ff9176d54955996d7065c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Configure Multer to use memory storage
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory temporarily
});

// Function to upload a file to Firebase Storage
const uploadFileToFirebase = async (file) => {
  const originalName = file.originalname;
  const extension = path.extname(originalName);
  const filename = uuid.v4() + extension;
  const fileRef = ref(storage, `images/${filename}`);

  try {
    await uploadBytes(fileRef, file.buffer);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Upload to Firebase failed:", error);
    throw new Error("Upload failed");
  }
};

// Function to delete a file from Firebase Storage
const deleteFileFromFirebase = async (filename) => {
  const fileRef = ref(storage, `images/${filename}`);
  try {
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error("Delete from Firebase failed:", error);
    throw new Error("Delete failed");
  }
};

// Single file upload
router.post("/single", verify, upload.single("image"), async (req, res) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      // console.log("File not found");
      res.json({ success: false, error: "File not found." });
      return;
    }

    const downloadURL = await uploadFileToFirebase(uploadedFile);
    // console.log("Download URL:", downloadURL);
    res.json({ success: true, data: downloadURL });
  } catch (error) {
    console.error("Upload Error:", error);
    res.json({ success: false, error: error.message });
  }
});

// Multiple files upload
router.post("/multiple", verify, upload.array("images"), async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const limit = 5;
    if (uploadedFiles.length > limit) {
      res.json({ success: false, error: `Only ${limit} images allowed.` });
      return;
    }
    if (!uploadedFiles || uploadedFiles.length === 0) {
      res.json({ success: false, error: "Files not found" });
      return;
    }

    const downloadUrls = await Promise.all(
      uploadedFiles.map((file) => uploadFileToFirebase(file))
    );

    res.json({ success: true, data: downloadUrls });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Delete file
router.post("/delete", verify, async (req, res) => {
  try {
    const fileUrl = req.body.filename;
    const filename = fileUrl.split("/").pop();

    const deletionSuccess = await deleteFileFromFirebase(filename);

    if (deletionSuccess) {
      res.json({ success: true, data: "File deleted successfully." });
    } else {
      res.json({ success: false, error: "File could not be deleted." });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
