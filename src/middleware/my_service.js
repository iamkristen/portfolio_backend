const MyServiceModel = require("../model/my_service_model");

// Create a new service entry
async function createServiceEntry(req, res) {
    try {
        const data = req.body;
        const serviceEntry = new MyServiceModel(data);
        const savedEntry = await serviceEntry.save();

        res.json({ success: true, data: savedEntry });
    } catch (error) {
        console.error("Create Service Entry Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read all service entries
async function getAllServiceEntries(req, res) {
    try {
        const allEntries = await MyServiceModel.find();
        res.json({ success: true, data: allEntries });
    } catch (error) {
        console.error("Get All Service Entries Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
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
        console.error("Get Service Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Update a service entry by ID
async function updateServiceEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const data = req.body;
        const updatedEntry = await MyServiceModel.findByIdAndUpdate(entryId, data, { new: true });

        if (!updatedEntry) {
            return res.json({ success: false, error: "Failed to update service entry." });
        }

        res.json({ success: true, data: updatedEntry });
    } catch (error) {
        console.error("Update Service Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Delete a service entry by ID
async function deleteServiceEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const deletedEntry = await MyServiceModel.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.json({ success: false, error: "Failed to delete service entry." });
        }

        res.json({ success: true, data: "Service entry deleted successfully." });
    } catch (error) {
        console.error("Delete Service Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports = {
    createServiceEntry,
    getAllServiceEntries,
    getServiceEntryById,
    updateServiceEntryById,
    deleteServiceEntryById
};