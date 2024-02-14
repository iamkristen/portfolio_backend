const blogsModel = require("../model/blogs_model");

// Create a new blog
async function createBlog(req, res) {
    try {
        const data = req.body;
        const newBlog = new blogsModel(data);
        const savedBlog = await newBlog.save();

        res.json({ success: true, data: savedBlog });
    } catch (error) {
        console.error("Create Blog Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read all blogs
async function getAllBlogs(req, res) {
    try {
        const allBlogs = await blogsModel.find();
        res.json({ success: true, data: allBlogs });
    } catch (error) {
        console.error("Get All Blogs Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read a specific blog by ID
async function getBlogById(req, res) {
    try {
        const blogId = req.params.id;
        const blog = await blogsModel.findById(blogId);

        if (!blog) {
            return res.json({ success: false, error: "Blog not found." });
        }

        res.json({ success: true, data: blog });
    } catch (error) {
        console.error("Get Blog by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Update a blog by ID
async function updateBlogById(req, res) {
    try {
        const blogId = req.params.id;
        const data = req.body;
        const updatedBlog = await blogsModel.findByIdAndUpdate(blogId, data, { new: true });

        if (!updatedBlog) {
            return res.json({ success: false, error: "Failed to update blog." });
        }

        res.json({ success: true, data: updatedBlog });
    } catch (error) {
        console.error("Update Blog by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Delete a blog by ID
async function deleteBlogById(req, res) {
    try {
        const blogId = req.params.id;
        const deletedBlog = await blogsModel.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.json({ success: false, error: "Failed to delete blog." });
        }

        res.json({ success: true, data: "Blog deleted successfully." });
    } catch (error) {
        console.error("Delete Blog by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById
};
