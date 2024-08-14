const contactMeModel = require("../model/contact_me_model");

// Create contact information
async function createContactInfo(req, res) {
  try {
    const data = req.body;
    const contactInfo = new contactMeModel(data);
    const savedData = await contactInfo.save();

    res.json({ success: true, data: savedData });
  } catch (error) {
    // console.error("Create Contact Info Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read contact information
async function getContactInfo(req, res) {
  try {
    const result = await contactMeModel.findOne();

    if (!result) {
      return res.json({
        success: false,
        error: "Contact information not found.",
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update contact information
async function updateContactInfo(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await contactMeModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedData) {
      return res.json({
        success: false,
        error: "Failed to update contact information.",
      });
    }

    res.json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete contact information
async function deleteContactInfo(req, res) {
  try {
    const id = req.params.id;
    const deletedData = await contactMeModel.findByIdAndDelete(id);

    if (!deletedData) {
      return res.json({
        success: false,
        error: "Failed to delete contact information.",
      });
    }

    res.json({
      success: true,
      data: "Contact information deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createContactInfo,
  getContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
