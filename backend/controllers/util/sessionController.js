const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");
const hashMapSession = {};
async function getSession(req, next) {
	try {
		return hashMapSession[req.cookies.sessionId];
		//return await getSessionFromStorage(req.cookies.sessionId);
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
	try {
		delete hashMapSession[session.info.sessionId];
	}catch (err) {
		next(err);
	}
}

module.exports = {
	getSession,
	addSession,
	removeSession,
	getAllSessions,
	hashMapSession,
};
