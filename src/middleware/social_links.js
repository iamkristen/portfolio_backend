const SocialLinksModel = require("../model/social_links_model");

// Create a new social link
async function createSocialLink(req, res) {
  try {
    const data = req.body;
    const socialLinkEntry = new SocialLinksModel(data);
    const savedEntry = await socialLinkEntry.save();

    res.json({ success: true, data: savedEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read all social links
async function getAllSocialLinks(req, res) {
  try {
    const allSocialLinks = await SocialLinksModel.find();
    res.json({ success: true, data: allSocialLinks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Read a specific social link by ID
async function getSocialLinkById(req, res) {
  try {
    const socialLinkId = req.params.id;
    const socialLink = await SocialLinksModel.findById(socialLinkId);

    if (!socialLink) {
      return res.json({ success: false, error: "Social link not found." });
    }

    res.json({ success: true, data: socialLink });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update a social link by ID
async function updateSocialLinkById(req, res) {
  try {
    const socialLinkId = req.params.id;
    const data = req.body;
    const updatedSocialLink = await SocialLinksModel.findByIdAndUpdate(
      socialLinkId,
      data,
      { new: true }
    );

    if (!updatedSocialLink) {
      return res.json({
        success: false,
        error: "Failed to update social link.",
      });
    }

    res.json({ success: true, data: updatedSocialLink });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete a social link by ID
async function deleteSocialLinkById(req, res) {
  try {
    const socialLinkId = req.params.id;
    const deletedSocialLink = await SocialLinksModel.findByIdAndDelete(
      socialLinkId
    );

    if (!deletedSocialLink) {
      return res.json({
        success: false,
        error: "Failed to delete social link.",
      });
    }

    res.json({ success: true, data: "Social link deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createSocialLink,
  getAllSocialLinks,
  getSocialLinkById,
  updateSocialLinkById,
  deleteSocialLinkById,
};
