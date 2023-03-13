const express = require('express');
const session=require("../controllers/AuthController");
const userSessionRouter = express.Router();
userSessionRouter.use(async function (req, res, next) {

    //req.session.user TODO
    if(true) { // dejamos correr la petición
        next();
    } else {
        res.redirect("/login");
    }
});
module.exports = userSessionRouter;