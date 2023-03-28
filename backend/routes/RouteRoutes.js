module.exports = function (app,routeController) {
    app.get('/route', routeController.getAllRoutes);
}