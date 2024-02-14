const router = require("express").Router();
const aboutMe = require("../middleware/about_me");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,aboutMe.addAboutMe);
router.post("/update/:id",verify,aboutMe.updateAboutMe);
router.delete("/delete/:id",verify,aboutMe.deleteAboutMe);
router.get("/get",aboutMe.getAboutMe);




module.exports = router;