const {
	getSessionFromStorage,
	Session,
} = require("@inrupt/solid-client-authn-node");
const solid = require("../solid/Solid.js");
const port = 8080;

async function login(req, res, next) {
	const session = new Session();
	req.session.sessionId = session.info.sessionId;
	const redirectToSolidIdentityProvider = (url) => {
		res.redirect(url);
	};
	await session.login({
		redirectUrl: "http://localhost:" + port + "/redirect-from-solid-idp",
		oidcIssuer: "https://login.inrupt.com",
		clientName: "LoMap",
		handleRedirect: redirectToSolidIdentityProvider,
	});
}

async function redirectFromSolidIdp(req, res, next) {
	const session = await getSessionFromStorage(req.session.sessionId);

	await session.handleIncomingRedirect(`http://localhost:${port}${req.url}`);

	if (session.info.isLoggedIn) {
		//if (!solid.isStructCreated(session)) {
		//	solid.createStruct(session);
		//}
		req.session.user = session.info.webId;
		req.session.sessionId = req.session.sessionId;
		res.cookie("sessionId", req.session.sessionId, {
			maxAge: 24 * 60 * 60 * 1000,
		}); // Set cookie with name 'sessionId' and value of req.session.sessionId with a max age of 24 hours (in milliseconds)

		return res.send(
			`<p>User ${req.session.user} logged in with the session ${req.session.sessionid}.</p>`
		);
	}
}

async function logout(req, res, next) {
	const session = await getSessionFromStorage(req.session.sessionId);
	session.logout();
	req.session.user = null;
	res.send(`<p>Logged out.</p>`);
}

async function index(req, res, next) {
	res.send(`<p>Esta es la respuesta default de la restAPI</p>`);
}

module.exports = {
	login,
	logout,
	redirectFromSolidIdp,
	index,
};
