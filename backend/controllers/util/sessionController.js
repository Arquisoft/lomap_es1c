const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");
async function getSession(req, next) {
	try {
		return await getSessionFromStorage(req.cookies.sessionId);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getSession,
};
