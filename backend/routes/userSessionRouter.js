const express = require('express');
const userSessionRouter = express.Router();
userSessionRouter.use(function (req, res, next) {
    if (req.session.user) { // dejamos correr la petición
        req.header("Access-Control-Allow-Origin: http://localhost:3000/")
        next();
    } else {
        res.redirect("/login");
    }
});
module.exports = userSessionRouter;