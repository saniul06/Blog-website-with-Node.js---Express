const router = require("express").Router();
const upload = require('../middleware/uploadMiddleware');
const { isAuthenticated } = require("../middleware/authMiddleware");
const { uploadProfilePics, removeProfilePics, uploadPostImageController } = require('../controllers/uploadController')

router.post("/profile-pic", isAuthenticated, upload.single('profilePics'), uploadProfilePics);
router.delete("/profile-pic", isAuthenticated, removeProfilePics);
router.post("/post-image", isAuthenticated, upload.single('post-image'), uploadPostImageController)

module.exports = router;