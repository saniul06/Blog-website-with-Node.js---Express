const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const postValidator = require("../validator/dashboard/postValidator");
const upload = require('../middleware/uploadMiddleware');

const {
    createPostGetController,
    createPostPostController,
} = require("../controllers/postController");

router.get("/create", isAuthenticated, createPostGetController);
router.post("/create", isAuthenticated, upload.single('aaa'), postValidator, createPostPostController);

module.exports = router;
