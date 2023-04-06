module.exports = function (app, sessionController) {
	app.get("/login", sessionController.login);
	app.get("/redirect-from-solid-idp", sessionController.redirectFromSolidIdp);
	app.get("/logout", sessionController.logout);
	app.get("/", sessionController.index);
	app.post("/login-from-webapp", sessionController.loginFromWebapp);
};
