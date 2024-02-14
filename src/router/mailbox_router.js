const router = require("express").Router();
const mailbox = require("../middleware/mailbox");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,mailbox.createMailboxEntry);
router.post("/update/:id",verify,mailbox.updateMailboxEntryById);
router.delete("/delete/:id",verify,mailbox.deleteMailboxEntryById);
router.get("/get",mailbox.getAllMailboxEntries);
router.get("/get/:id",mailbox.getMailboxEntryById);


module.exports = router;