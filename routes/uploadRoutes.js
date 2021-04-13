const router = require("express").Router();
const upload = require('../middleware/uploadMiddleware');
const { isAuthenticated } = require("../middleware/authMiddleware");
const { uploadProfilePics } = require('../controllers/uploadController')

router.post("/profile-pics", isAuthenticated, upload.single('profilePics'), uploadProfilePics);

module.exports = router;