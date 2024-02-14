const router = require("express").Router();
const project = require("../middleware/project");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,project.createProject);
router.post("/update/:id",verify,project.updateProjectById);
router.delete("/delete/:id",verify,project.deleteProjectById);
router.get("/get",project.getAllProjects);
router.get("/get/:id",project.getProjectById);

 
module.exports = router;