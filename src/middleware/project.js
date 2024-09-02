const ProjectModel = require("../model/project_model");

// Create a new project
async function createProject(req, res) {
  try {
    const data = req.body;
    const projectEntry = new ProjectModel(data);
    const savedEntry = await projectEntry.save();

    res.json({ success: true, data: savedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read all projects
async function getAllProjects(req, res) {
  try {
    const allProjects = await ProjectModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: allProjects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read a specific project by ID
async function getProjectById(req, res) {
  try {
    const projectId = req.params.id;
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.json({ success: false, error: "Project not found." });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update a project by ID
async function updateProjectById(req, res) {
  try {
    const projectId = req.params.id;
    const data = req.body;
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      data,
      { new: true }
    );

    if (!updatedProject) {
      return res.json({ success: false, error: "Failed to update project." });
    }

    res.json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete a project by ID
async function deleteProjectById(req, res) {
  try {
    const projectId = req.params.id;
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.json({ success: false, error: "Failed to delete project." });
    }

    res.json({ success: true, data: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
