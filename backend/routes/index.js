module.exports = function (app,authController) {
    app.get('/login', authController.login);
    app.get('/redirect-from-solid-idp', authController.redirectFromSolidIdp);
    app.get('/fetch', authController.fetch);
    app.get('/logout', authController.logout);
    app.get('/', authController.index);
}
