const express = require('express');
const userSessionRouter = express.Router();
userSessionRouter.use(function (req, res, next) {

    //req.session.user TODO
    if (true) { // dejamos correr la petición
        next();
    } else {
        res.redirect("/login");
    }
});
module.exports = userSessionRouter;