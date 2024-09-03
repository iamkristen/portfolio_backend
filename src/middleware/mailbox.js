const MailboxModel = require("../model/mailbox_model");

// Create a new mailbox entry
async function createMailboxEntry(req, res) {
  try {
    const data = req.body;
    const mailboxEntry = new MailboxModel(data);
    const savedEntry = await mailboxEntry.save();

    res.json({ success: true, data: savedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read all mailbox entries
async function getAllMailboxEntries(req, res) {
  try {
    const allEntries = await MailboxModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: allEntries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update a mailbox entry by ID
async function updateMailboxEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const data = req.body;
    const updatedEntry = await MailboxModel.findByIdAndUpdate(entryId, data, {
      new: true,
    });

    if (!updatedEntry) {
      return res.json({
        success: false,
        error: "Failed to update mailbox entry.",
      });
    }

    res.json({ success: true, data: updatedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete a mailbox entry by ID
async function deleteMailboxEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const deletedEntry = await MailboxModel.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.json({
        success: false,
        error: "Failed to delete mailbox entry.",
      });
    }

    res.json({ success: true, data: "Mailbox entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createMailboxEntry,
  getAllMailboxEntries,
  getMailboxEntryById,
  updateMailboxEntryById,
  deleteMailboxEntryById,
};
