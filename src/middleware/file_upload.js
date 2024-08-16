// const multer = require("multer");
// const uuid = require("uuid");
// const firebase = require("firebase/app");
// require("firebase/storage");

// // Initialize Firebase with your config (from your provided snippet)
// const firebaseConfig = {
//   apiKey: "AIzaSyCdK3lsEXQ6WghVf97GssUXCMdQkDsaEG4",
//   authDomain: "portfolio-8b6b4.firebaseapp.com",
//   projectId: "portfolio-8b6b4",
//   storageBucket: "portfolio-8b6b4.appspot.com",
//   messagingSenderId: "39827811541",
//   appId: "1:39827811541:web:6ff9176d54955996d7065c",
// };

// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const storageRef = storage.ref();

// // Configure Multer to use memory storage
// const upload = multer({
//   storage: multer.memoryStorage(), // Store files in memory temporarily
// });

// const uploadFileToFirebase = async (file) => {
//   const originalName = file.originalname;
//   const extension = originalName.split(".").pop();
//   const filename = uuid.v4() + "." + extension;
//   const fileRef = storageRef.child(`images/${filename}`);

//   try {
//     const snapshot = await fileRef.put(file.buffer);
//     const downloadURL = await snapshot.ref.getDownloadURL();
//     return downloadURL;
//   } catch (error) {
//     console.error("Upload to Firebase failed:", error);
//     throw new Error("Upload failed");
//   }
// };

// module.exports = {
//   upload,
//   uploadFileToFirebase,
// };
