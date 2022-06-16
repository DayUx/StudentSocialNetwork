const {register,login} = require("../controller/userController");
const {images, messages} = require("../controller/schoolController")
const router = require('express').Router();
router.post("/register", register);
router.post("/login",login);
router.post("/getSchools", images)
router.post("/getMessages", messages)
module.exports = router;