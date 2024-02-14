const router = require("express").Router();
const education = require("../middleware/education");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,education.createEducationEntry);
router.post("/update/:id",verify,education.updateEducationEntryById);
router.delete("/delete/:id",verify,education.deleteEducationEntryById);
router.get("/get",education.getAllEducationEntries);
router.get("/get/:id",education.getEducationEntryById);


module.exports = router;