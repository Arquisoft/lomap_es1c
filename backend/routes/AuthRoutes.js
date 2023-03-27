module.exports = function (app,sessionController) {
    app.get('/login', sessionController.login);
    app.get('/redirect-from-solid-idp', sessionController.redirectFromSolidIdp);
    app.get('/fetch', sessionController.fetch);
    app.get('/logout', sessionController.logout);
    app.get('/', sessionController.index);
}