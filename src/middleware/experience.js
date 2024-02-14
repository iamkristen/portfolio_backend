const ExperienceModel = require("../model/experience_model")

// Create a new experience entry
async function createExperienceEntry(req, res) {
    try {
        const data = req.body;
        const experienceEntry = new ExperienceModel(data);
        const savedEntry = await experienceEntry.save();

        res.json({ success: true, data: savedEntry });
    } catch (error) {
        console.error("Create Experience Entry Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read all experience entries
async function getAllExperienceEntries(req, res) {
    try {
        const allEntries = await ExperienceModel.find();
        res.json({ success: true, data: allEntries });
    } catch (error) {
        console.error("Get All Experience Entries Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read a specific experience entry by ID
async function getExperienceEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const entry = await ExperienceModel.findById(entryId);

        if (!entry) {
            return res.json({ success: false, error: "Experience entry not found." });
        }

        res.json({ success: true, data: entry });
    } catch (error) {
        console.error("Get Experience Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Update an experience entry by ID
async function updateExperienceEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const data = req.body;
        const updatedEntry = await ExperienceModel.findByIdAndUpdate(entryId, data, { new: true });

        if (!updatedEntry) {
            return res.json({ success: false, error: "Failed to update experience entry." });
        }

        res.json({ success: true, data: updatedEntry });
    } catch (error) {
        console.error("Update Experience Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Delete an experience entry by ID
async function deleteExperienceEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const deletedEntry = await ExperienceModel.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.json({ success: false, error: "Failed to delete experience entry." });
        }

        res.json({ success: true, data: "Experience entry deleted successfully." });
    } catch (error) {
        console.error("Delete Experience Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports = {
    createExperienceEntry,
    getAllExperienceEntries,
    getExperienceEntryById,
    updateExperienceEntryById,
    deleteExperienceEntryById
};
