module.exports = function (app, routeController) {
	app.get("/route", routeController.getAllRoutes);
	app.get("/route/:id", routeController.getRouteById);
	app.post("/route", routeController.addRoute);
	app.put("/route/:id", routeController.updateRoute);
	app.delete("/route/:id", routeController.deleteRoute);
	app.post("route/:id/location", routeController.addLocationToRoute);
	app.delete("route/:id/location", routeController.deleteLocationFromRoute);
	app.post(
		"route/:id/changeOrder/:id",
		routeController.changeOrderOfLocationInRoute
	);
};
