const router = require("express").Router();
const socialLinks = require("../middleware/social_links");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,socialLinks.createSocialLink);
router.post("/update/:id",verify,socialLinks.updateSocialLinkById);
router.delete("/delete/:id",verify,socialLinks.deleteSocialLinkById);
router.get("/get",socialLinks.getAllSocialLinks);
router.get("/get/:id",socialLinks.getSocialLinkById);

 
module.exports = router;