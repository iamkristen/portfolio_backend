const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const parser = require("body-parser");
const login = require("./router/authentication_router");
const aboutMe = require("./router/about_me_router");
const blogs = require("./router/blogs_router");
const contactMe = require("./router/contact_me_router");
const education = require("./router/education_router");
const experience = require("./router/experience_router");
const knowledge = require("./router/knowledge_router");
const mailbox = require("./router/mailbox_router");
const service = require("./router/my_service_router");
const project = require("./router/project_router");
const skills = require("./router/skills_router");
const social = require("./router/social_links_router");
const fileRouter = require("./router/file_router");
const certificate = require("./router/certificate_router");
const cors = require("cors");
//dot environment configuration
dotenv.config();

//Handling middleware
app.use(parser.json());
app.use(
  cors({
    origin: [
      "https://ravikushwaha.netlify.app",
      "https://portdashboard.netlify.app",
      "https://www.ravikushwaha.co.uk",
      "https://ravikushwaha.co.uk",
      "https://www.ravikushwaha.me",
      "https://ravikushwaha.me",
      "https://www.dashboard.ravikushwaha.co.uk",
      "https://dashboard.ravikushwaha.co.uk",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  })
);
app.use(parser.urlencoded({ extended: false }));

//handling router
app.use("/api/", login);
app.use("/api/about-me/", aboutMe);
app.use("/api/blogs/", blogs);
app.use("/api/contact-me/", contactMe);
app.use("/api/education/", education);
app.use("/api/experience/", experience);
app.use("/api/knowledge/", knowledge);
app.use("/api/mailbox/", mailbox);
app.use("/api/service/", service);
app.use("/api/projects/", project);
app.use("/api/skills/", skills);
app.use("/api/social/", social);
app.use("/api/upload/", fileRouter);
app.use("/api/certificate/", certificate);
app.use(express.static("uploads"));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connect"))
  .catch((err) => console.log("Something Went Wrong"));

//get request for test
app.get("/", (req, res) => {
  res.send("App is running.....");
});

//starting server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}`);
});

//listening to unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
module.exports = app;
