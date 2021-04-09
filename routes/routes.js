const authRoute = require("./authRoutes");
const dashboardRoute = require("./dashboardRoutes");
const validatorRoutes = require("../play/play"); // TODO: remove this
const {
    isAuthenticated,
    isUnAuthenticated,
} = require("../middleware/authMiddleware");

const routes = [
    {
        path: "/auth",
        handler: authRoute,
    },
    {
        path: "/dashboard",
        handler: dashboardRoute,
    },
    {
        path: "/play", // TODO: remove this
        handler: validatorRoutes,
        middleware: [],
    },
    {
        path: "/",
        handler: (req, res) => {return res.json("root route")},
        middleware: [],
    },
];

module.exports = (app) =>
    routes.forEach((route) => {
        if (route.path == "/") {
             return app.get(route.path, route.handler);
        }
          app.use(route.path, route.handler);
    });