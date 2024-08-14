const MyServiceModel = require("../model/my_service_model");

// Create a new service entry
async function createServiceEntry(req, res) {
  try {
    const data = req.body;
    const serviceEntry = new MyServiceModel(data);
    const savedEntry = await serviceEntry.save();

    res.json({ success: true, data: savedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read all service entries
async function getAllServiceEntries(req, res) {
  try {
    const allEntries = await MyServiceModel.find();
    res.json({ success: true, data: allEntries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read a specific service entry by ID
async function getServiceEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const entry = await MyServiceModel.findById(entryId);

    if (!entry) {
      return res.json({ success: false, error: "Service entry not found." });
    }

    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update a service entry by ID
async function updateServiceEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const data = req.body;
    const updatedEntry = await MyServiceModel.findByIdAndUpdate(entryId, data, {
      new: true,
    });

    if (!updatedEntry) {
      return res.json({
        success: false,
        error: "Failed to update service entry.",
      });
    }

    res.json({ success: true, data: updatedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete a service entry by ID
async function deleteServiceEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const deletedEntry = await MyServiceModel.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.json({
        success: false,
        error: "Failed to delete service entry.",
      });
    }

    res.json({ success: true, data: "Service entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createServiceEntry,
  getAllServiceEntries,
  getServiceEntryById,
  updateServiceEntryById,
  deleteServiceEntryById,
};
