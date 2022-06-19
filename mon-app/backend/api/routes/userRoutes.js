const {register,login} = require("../controller/userController");
const {images, messages, getSchools,createSchool,joinSchool, quitSchool} = require("../controller/schoolController")
const router = require('express').Router();
router.post("/register", register);
router.post("/login",login);
router.post("/getSchoolsOfUser", images)
router.post("/getMessages", messages)
router.post("/getSchools", getSchools)
router.post("/createSchool", createSchool)
router.post("/joinSchool", joinSchool)
router.post("/quitSchool", quitSchool)
module.exports = router;