const router = require("express").Router();
const experience = require("../middleware/experience");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,experience.createExperienceEntry);
router.post("/update/:id",verify,experience.updateExperienceEntryById);
router.delete("/delete/:id",verify,experience.deleteExperienceEntryById);
router.get("/get",experience.getAllExperienceEntries);
router.get("/get/:id",experience.getExperienceEntryById);


module.exports = router;