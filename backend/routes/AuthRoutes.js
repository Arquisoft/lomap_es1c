module.exports = function (app, sessionController) {
	app.get("/login", sessionController.login);
	app.get("/redirect-from-solid-idp", sessionController.redirectFromSolidIdp);
	app.get("/logout", sessionController.logout);
	app.get("/", sessionController.index);
	app.get("/login-from-webapp", sessionController.loginFromWeb);
	app.get(
		"/redirect-from-solid-idp-web",
		sessionController.redirectFromSolidIdpWeb
	);
	app.post("/isLoggedIn", sessionController.isLoggedIn);
};
