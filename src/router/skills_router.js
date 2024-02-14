const router = require("express").Router();
const skills = require("../middleware/skills");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,skills.createSkill);
router.post("/update/:id",verify,skills.updateSkillById);
router.delete("/delete/:id",verify,skills.deleteSkillById);
router.get("/get",skills.getAllSkills);
router.get("/get/:id",skills.getSkillById);

 
module.exports = router;