const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");
const express = require("express");
const userSessionRouter = express.Router();
const SessionController = require("../controllers/util/SessionController.js");
userSessionRouter.use(async function (req, res, next) {
	try {
		session = await SessionController.getSession(req, next);
		//session = await getSessionFromStorage(req.cookies.sessionId);
		if (session != null && session.info.isLoggedIn) {
			next();
		} else {
			res.status(401).json("No se ha iniciado sesion");
		}
	} catch (err) {
		next(err);
	}
});
module.exports = userSessionRouter;
