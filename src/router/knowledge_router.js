const router = require("express").Router();
const knowledge = require("../middleware/knowledge");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,knowledge.createKnowledgeEntry);
router.post("/update/:id",verify,knowledge.updateKnowledgeEntryById);
router.delete("/delete/:id",verify,knowledge.deleteKnowledgeEntryById);
router.get("/get",knowledge.getAllKnowledgeEntries);
router.get("/get/:id",knowledge.getKnowledgeEntryById);


module.exports = router;