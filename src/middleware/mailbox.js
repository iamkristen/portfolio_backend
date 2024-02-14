const MailboxModel = require("../model/mailbox_model");

// Create a new mailbox entry
async function createMailboxEntry(req, res) {
    try {
        const data = req.body;
        const mailboxEntry = new MailboxModel(data);
        const savedEntry = await mailboxEntry.save();

        res.json({ success: true, data: savedEntry });
    } catch (error) {
        console.error("Create Mailbox Entry Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read all mailbox entries
async function getAllMailboxEntries(req, res) {
    try {
        const allEntries = await MailboxModel.find();
        res.json({ success: true, data: allEntries });
    } catch (error) {
        console.error("Get All Mailbox Entries Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Read a specific mailbox entry by ID
async function getMailboxEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const entry = await MailboxModel.findById(entryId);

        if (!entry) {
            return res.json({ success: false, error: "Mailbox entry not found." });
        }

        res.json({ success: true, data: entry });
    } catch (error) {
        console.error("Get Mailbox Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Update a mailbox entry by ID
async function updateMailboxEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const data = req.body;
        const updatedEntry = await MailboxModel.findByIdAndUpdate(entryId, data, { new: true });

        if (!updatedEntry) {
            return res.json({ success: false, error: "Failed to update mailbox entry." });
        }

        res.json({ success: true, data: updatedEntry });
    } catch (error) {
        console.error("Update Mailbox Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

// Delete a mailbox entry by ID
async function deleteMailboxEntryById(req, res) {
    try {
        const entryId = req.params.id;
        const deletedEntry = await MailboxModel.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.json({ success: false, error: "Failed to delete mailbox entry." });
        }

        res.json({ success: true, data: "Mailbox entry deleted successfully." });
    } catch (error) {
        console.error("Delete Mailbox Entry by ID Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports = {
    createMailboxEntry,
    getAllMailboxEntries,
    getMailboxEntryById,
    updateMailboxEntryById,
    deleteMailboxEntryById
};