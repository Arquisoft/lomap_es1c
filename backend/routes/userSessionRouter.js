const { getSessionFromStorage} = require('@inrupt/solid-client-authn-node');
const express = require('express');
const session=require("../controllers/AuthController");
const userSessionRouter = express.Router();
userSessionRouter.use(async function (req, res, next) {

    //req.session.user TODO
    console.log(req.sessionId)
    console.log(req.sessionUser);
    req.session=getSessionFromStorage(req.sessionId);
    
    if(true) { 
        next();
    } else {
    }
});
module.exports = userSessionRouter;