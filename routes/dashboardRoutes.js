const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const {
    dashboardGetController,
    createProfileGetController,
    editProfileGetController,
    uploadProfilePics
} = require("../controllers/dashboardController");

router.get("/", isAuthenticated, dashboardGetController);

router.get("/create-profile", isAuthenticated, createProfileGetController);

router.get("/edit-profile", isAuthenticated, editProfileGetController);

module.exports = router;
