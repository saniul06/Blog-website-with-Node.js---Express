const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require('../middleware/uploadMiddleware');

const {
    dashboardGetController,
    createProfileGetController,
    editProfileGetController,
    // uploadProfilePics
} = require("../controllers/dashboardController");

router.get("/", isAuthenticated, dashboardGetController);

router.get("/create-profile", isAuthenticated, createProfileGetController);

router.get("/edit-profile", isAuthenticated, editProfileGetController);

// router.post("/upload/profile-pics", isAuthenticated, upload.single('profilePics'), uploadProfilePics);

module.exports = router;
