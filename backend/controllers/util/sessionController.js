const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");
const hashMapSession = {};

async function getSession(req, next) {
	try {
		let session = hashMapSession[req.cookies.sessionId];
		return session;
	} catch (err) {
		next(err);
	}
}

async function getAllSessions() {
	return hashMapSession;
}
async function addSession(session) {
	hashMapSession[session.info.sessionId] = session;
}
async function removeSession(session) {
	delete hashMapSession[session.info.sessionId];
}

module.exports = {
	getSession,
	addSession,
	removeSession,
	getAllSessions,
	hashMapSession,
};
