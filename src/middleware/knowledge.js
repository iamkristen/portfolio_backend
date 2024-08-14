const KnowledgeModel = require("../model/knowledge_model");

// Create a new knowledge entry
async function createKnowledgeEntry(req, res) {
  try {
    const data = req.body;
    const knowledgeEntry = new KnowledgeModel(data);
    const savedEntry = await knowledgeEntry.save();

    res.json({ success: true, data: savedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read all knowledge entries
async function getAllKnowledgeEntries(req, res) {
  try {
    const allEntries = await KnowledgeModel.find();
    res.json({ success: true, data: allEntries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read a specific knowledge entry by ID
async function getKnowledgeEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const entry = await KnowledgeModel.findById(entryId);

    if (!entry) {
      return res.json({ success: false, error: "Knowledge entry not found." });
    }

    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update a knowledge entry by ID
async function updateKnowledgeEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const data = req.body;
    const updatedEntry = await KnowledgeModel.findByIdAndUpdate(entryId, data, {
      new: true,
    });

    if (!updatedEntry) {
      return res.json({
        success: false,
        error: "Failed to update knowledge entry.",
      });
    }

    res.json({ success: true, data: updatedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete a knowledge entry by ID
async function deleteKnowledgeEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const deletedEntry = await KnowledgeModel.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.json({
        success: false,
        error: "Failed to delete knowledge entry.",
      });
    }

    res.json({ success: true, data: "Knowledge entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createKnowledgeEntry,
  getAllKnowledgeEntries,
  getKnowledgeEntryById,
  updateKnowledgeEntryById,
  deleteKnowledgeEntryById,
};
