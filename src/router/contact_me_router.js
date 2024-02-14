const router = require("express").Router();
const contactMe = require("../middleware/contact_me");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,contactMe.createContactInfo);
router.post("/update/:id",verify,contactMe.updateContactInfo);
router.delete("/delete/:id",verify,contactMe.deleteContactInfo);
router.get("/get",contactMe.getContactInfo);


module.exports = router;