const {register,login} = require("../controller/userController");
const {images, messages, getSchools} = require("../controller/schoolController")
const router = require('express').Router();
router.post("/register", register);
router.post("/login",login);
router.post("/getSchoolsOfUser", images)
router.post("/getMessages", messages)
router.post("/getSchools", getSchools)
module.exports = router;