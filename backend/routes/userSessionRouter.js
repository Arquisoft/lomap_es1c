const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");
const express = require("express");
const userSessionRouter = express.Router();
userSessionRouter.use(async function (req, res, next) {
	session = await getSessionFromStorage(req.session.sessionId);
	if (session != null && session.info.isLoggedIn) {
		next();
	} else {
		res.status(401).json("No se ha iniciado sesion");
	}
});
module.exports = userSessionRouter;
