async function getSession() {
	try {
		session = await getSessionFromStorage(req.session.sessionId);
	} catch (err) {
		throw new Error("There was an error retrieving the session");
	}
}
module.exports = {
	getSession,
};
