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
		if (!solid.isStructCreated(session)) {
			solid.createStruct(session);
		}
		req.sessionUser = session.info.webId;
		req.sessionId = req.session.sessionId;
		console.log(req.sessionUser);
		console.log(req.sessionId);
		return res.send(`<p>Logged in with the WebID ${session.info.webId}.</p>`);
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
