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
		req.session.user = session.info.webId;
		req.session.sessionId = req.session.sessionId;
		res.cookie("sessionId", req.session.sessionId, {
			maxAge: 24 * 60 * 60 * 1000,
		}); // Set cookie with name 'sessionId' and value of req.session.sessionId with a max age of 24 hours (in milliseconds)
		//return res.send("xd,tas logeao chaval");
		return res.redirect("http://localhost:3000");
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
async function loginFromWebapp(req, res, next) {
	const { webId, sessionId } = req.body;
	req.session.user = webId;
	req.session.sessionId = sessionId;
	res.status(204).json({ message: "Logged in" });
	console.log("tas logeao chaval");
	console.log(req.session.user);
	console.log(req.session.sessionId);
}

module.exports = {
	login,
	logout,
	redirectFromSolidIdp,
	index,
	loginFromWebapp,
};
