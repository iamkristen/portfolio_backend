const router = require("express").Router();
const blogs = require("../middleware/blogs");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,blogs.createBlog);
router.post("/update/:id",verify,blogs.updateBlogById);
router.delete("/delete/:id",verify,blogs.deleteBlogById);
router.get("/get",blogs.getAllBlogs);
router.get("/get/:id",blogs.getBlogById);


module.exports = router;