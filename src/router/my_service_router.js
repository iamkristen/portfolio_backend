const router = require("express").Router();
const service = require("../middleware/my_service");
const {verify} = require("../middleware/authentication")

router.post("/add",verify,service.createServiceEntry);
router.post("/update/:id",verify,service.updateServiceEntryById);
router.delete("/delete/:id",verify,service.deleteServiceEntryById);
router.get("/get",service.getAllServiceEntries);
router.get("/get/:id",service.getServiceEntryById);

 
module.exports = router;