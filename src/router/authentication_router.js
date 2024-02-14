const router = require("express").Router();
const {authenticate} = require("../middleware/authentication")


router.post("/login",authenticate)


module.exports = router;