const {
	getSessionFromStorage,
	Session,
	getSessionIdFromStorageAll,
} = require("@inrupt/solid-client-authn-node");
const solid = require("../solid/Solid.js");
const port = 8080;
const SessionController = require("../controllers/util/SessionController.js");

async function login(req, res, next) {
	const { provider, redirect } = req.body;
	try {
		let loginProvider;
		if (provider) {
			loginProvider = provider;
		} else {
			loginProvider = "https://login.inrupt.com";
		}
		let redirection;
		if (redirect) {
			redirection = redirect;
		} else {
			redirection = false;
		}
		const session = new Session();
		res.cookie("sessionId", session.info.sessionId);
		const redirectToSolidIdentityProvider = (url) => {
			res.redirect(url);
		};
		await session.login({
			redirectUrl: "http://localhost:" + port + "/redirect-from-solid-idp",
			oidcIssuer: loginProvider,
			clientName: "LoMap",
			handleRedirect: redirectToSolidIdentityProvider,
		});
	} catch (err) {
		next(err);
	}
}

async function redirectFromSolidIdp(req, res, next) {
	try {
		const session = await getSessionFromStorage(req.cookies.sessionId);
		await session.handleIncomingRedirect(`http://localhost:${port}${req.url}`);
		if (session.info.isLoggedIn) {
			await SessionController.addSession(session);
			solid.createStruct(session);
			return res.status(200).redirect("http://localhost:3000");
		}
	} catch (err) {
		next(err);
	}
}

async function logout(req, res, next) {
	//const session = await getSessionFromStorage(req.session.sessionId);
	const session = SessionController.getSession(req, next);
	session.logout();
	SessionController.removeSession(session);
	res.send(`<p>Logged out.</p>`);
}

async function index(req, res, next) {
	res.send(`<p>Esta es la respuesta default de la restAPI</p>`);
}
/*
async function loginFromWeb(req, res, next) {
	const session = new Session();

	res.cookie("sessionId", session.info.sessionId);
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
	try {
		const session = await getSessionFromStorage(req.cookies.sessionId);
		await session.handleIncomingRedirect(`http://localhost:${port}${req.url}`);
		if (session.info.isLoggedIn) {
			await SessionController.addSession(session);
			console.log(await SessionController.getAllSessions());
			solid.createStruct(session);
			return res.status(200).redirect("http://localhost:3000");
		}
	} catch (err) {
		next(err);
	}
}
*/
async function isLoggedIn(req, res, next) {
	try {
		const session = await SessionController.getSession(req, next);
		//const session = await getSessionFromStorage(req.cookies.sessionId);
		if (session) {
			res.status(200).json("Sesion iniciada");
		} else {
			res.status(401).json("No se ha iniciado sesion");
		}
	} catch (err) {
		next(err);
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
