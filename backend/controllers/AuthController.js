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
		solid.createStruct(session);
		console.log(req.session.sessionId);
		req.session.user = session.info.webId;
		req.session.sessionId = req.session.sessionId;
		return res.send(`<p>Logged in.</p>`);
	}
}

async function logout(req, res, next) {
	const session = await getSessionFromStorage(req.session.sessionId);
	session.logout();
	req.session.user = null;
	req.session.sessionId = null;
	res.send(`<p>Logged out.</p>`);
}

async function index(req, res, next) {
	res.send(`<p>Esta es la respuesta default de la restAPI</p>`);
}

async function loginFromWeb(req, res, next) {
	const session = new Session();
	req.session.sessionId = session.info.sessionId;
	const redirectToSolidIdentityProvider = (url) => {
		res.redirect(url);
	};
	await session.login({
		redirectUrl: "http://localhost:" + port + "/redirect-from-solid-idp-web",
		oidcIssuer: "https://login.inrupt.com",
		clientName: "LoMap",
		handleRedirect: redirectToSolidIdentityProvider,
	});
}

async function redirectFromSolidIdpWeb(req, res, next) {
	const session = await getSessionFromStorage(req.session.sessionId);
	await session.handleIncomingRedirect(`http://localhost:${port}${req.url}`);
	if (session.info.isLoggedIn) {
		solid.createStruct(session);
		req.session.user = session.info.webId;
		req.session.sessionId = req.session.sessionId;

		return res
			.cookie("sessionId", req.session.sessionId)
			.redirect(`http://localhost:3000`);
	}
}
async function isLoggedIn(req, res) {
	const { sessionId } = req.body;

	console.log(typeof sessionId);
	console.log(sessionId);
	const session = await getSessionFromStorage(sessionId);

	console.log(session);
	if (session) {
		res.status(200).json("Sesion iniciada");
	} else {
		res.status(401).json("what");
	}
}

module.exports = {
	login,
	logout,
	redirectFromSolidIdp,
	index,
	loginFromWeb,
	redirectFromSolidIdpWeb,
	isLoggedIn,
};
