const {
    loginGetController,
    loginPostController,
    signupGetController,
    signupPostController,
    logoutController,
} = require("../controllers/authControllers");

const setLocals = require("../middleware/setLocals");
const { isUnAuthenticated } = require("../middleware/authMiddleware");

const router = require("express").Router();
const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");

router.get("/login", isUnAuthenticated, loginGetController, setLocals);

router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/signup", isUnAuthenticated, signupGetController);

router.post("/signup", isUnAuthenticated, signupValidator, signupPostController);

router.get("/logout", logoutController);

module.exports = router;
