const SkillsModel = require("../model/skills_model");

// Create a new skill
async function createSkill(req, res) {
    try {
        const data = req.body;
        const skillEntry = new SkillsModel(data);
        const savedEntry = await skillEntry.save();

        res.json({ success: true, data: savedEntry });
    } catch (error) {
        console.error("Create Skill Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read all skills
async function getAllSkills(req, res) {
    try {
        const allSkills = await SkillsModel.find();
        res.json({ success: true, data: allSkills });
    } catch (error) {
        console.error("Get All Skills Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read a specific skill by ID
async function getSkillById(req, res) {
    try {
        const skillId = req.params.id;
        const skill = await SkillsModel.findById(skillId);

        if (!skill) {
            return res.json({ success: false, error: "Skill not found." });
        }

        res.json({ success: true, data: skill });
    } catch (error) {
        console.error("Get Skill by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Update a skill by ID
async function updateSkillById(req, res) {
    try {
        const skillId = req.params.id;
        const data = req.body;
        const updatedSkill = await SkillsModel.findByIdAndUpdate(skillId, data, { new: true });

        if (!updatedSkill) {
            return res.json({ success: false, error: "Failed to update skill." });
        }

        res.json({ success: true, data: updatedSkill });
    } catch (error) {
        console.error("Update Skill by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Delete a skill by ID
async function deleteSkillById(req, res) {
    try {
        const skillId = req.params.id;
        const deletedSkill = await SkillsModel.findByIdAndDelete(skillId);

        if (!deletedSkill) {
            return res.json({ success: false, error: "Failed to delete skill." });
        }

        res.json({ success: true, data: "Skill deleted successfully." });
    } catch (error) {
        console.error("Delete Skill by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkillById,
    deleteSkillById
};