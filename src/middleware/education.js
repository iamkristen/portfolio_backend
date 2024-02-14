

const EducationModel = require("../model/education_model")

// Create a new education entry
async function createEducationEntry(req, res) {
    try {
        const data = req.body;
        const educationEntry = new EducationModel(data);
        const savedEntry = await educationEntry.save();

        res.json({ success: true, data: savedEntry });
    } catch (error) {
        console.error("Create Education Entry Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read all education entries
async function getAllEducationEntries(req, res) {
    try {
        const allEntries = await EducationModel.find();
        res.json({ success: true, data: allEntries });
    } catch (error) {
        console.error("Get All Education Entries Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
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
        console.error("Get Education Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Update an education entry by ID
async function updateEducationEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const data = req.body;
        const updatedEntry = await EducationModel.findByIdAndUpdate(entryId, data, { new: true });

        if (!updatedEntry) {
            return res.json({ success: false, error: "Failed to update education entry." });
        }

        res.json({ success: true, data: updatedEntry });
    } catch (error) {
        console.error("Update Education Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Delete an education entry by ID
async function deleteEducationEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const deletedEntry = await EducationModel.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.json({ success: false, error: "Failed to delete education entry." });
        }

        res.json({ success: true, data: "Education entry deleted successfully." });
    } catch (error) {
        console.error("Delete Education Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports = {
    createEducationEntry,
    getAllEducationEntries,
    getEducationEntryById,
    updateEducationEntryById,
    deleteEducationEntryById
};
