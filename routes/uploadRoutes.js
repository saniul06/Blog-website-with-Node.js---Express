const router = require("express").Router();
const upload = require('../middleware/uploadMiddleware');
const { isAuthenticated } = require("../middleware/authMiddleware");
const { uploadProfilePics, removeProfilePics } = require('../controllers/uploadController')

router.post("/profile-pic", isAuthenticated, upload.single('profilePics'), uploadProfilePics);
router.delete("/profile-pic", isAuthenticated, removeProfilePics);

module.exports = router;