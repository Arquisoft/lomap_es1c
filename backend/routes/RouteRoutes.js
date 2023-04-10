module.exports = function (app, routeController) {
	app.get("/route", routeController.getAllRoutes);
	app.get("/route/:id", routeController.getRouteById);
	app.post("/route", routeController.addRoute);
	app.put("/route/:id", routeController.updateRoute);
	app.delete("/route/:id", routeController.deleteRoute);
	app.get(
		"/route/:idRoute/location/:idLocation",
		routeController.addLocationToRoute
	);
	app.delete(
		"/route/:idRoute/location/:idLocation",
		routeController.deleteLocationFromRoute
	);
	app.post(
		"/route/:idRoute/changeOrder/:idLocation",
		routeController.changeOrderOfLocationInRoute
	);
};
