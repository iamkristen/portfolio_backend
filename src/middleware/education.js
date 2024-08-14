const EducationModel = require("../model/education_model");

// Create a new education entry
async function createEducationEntry(req, res) {
  try {
    const data = req.body;
    const educationEntry = new EducationModel(data);
    const savedEntry = await educationEntry.save();

    res.json({ success: true, data: savedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read all education entries
async function getAllEducationEntries(req, res) {
  try {
    const allEntries = await EducationModel.find();
    res.json({ success: true, data: allEntries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read a specific education entry by ID
async function getEducationEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const entry = await EducationModel.findById(entryId);

    if (!entry) {
      return res.json({ success: false, error: "Education entry not found." });
    }

    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    s;
  }
}

// Update an education entry by ID
async function updateEducationEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const data = req.body;
    const updatedEntry = await EducationModel.findByIdAndUpdate(entryId, data, {
      new: true,
    });

    if (!updatedEntry) {
      return res.json({
        success: false,
        error: "Failed to update education entry.",
      });
    }

    res.json({ success: true, data: updatedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete an education entry by ID
async function deleteEducationEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const deletedEntry = await EducationModel.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.json({
        success: false,
        error: "Failed to delete education entry.",
      });
    }

    res.json({ success: true, data: "Education entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createEducationEntry,
  getAllEducationEntries,
  getEducationEntryById,
  updateEducationEntryById,
  deleteEducationEntryById,
};
