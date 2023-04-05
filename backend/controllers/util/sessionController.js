async function getSession(req, next) {
	try {
		throw new Error("There was an error retrieving the session");
		//session = await getSessionFromStorage(req.session.sessionId);
	} catch (err) {
		next(err);
	}
}
module.exports = {
	getSession,
};
