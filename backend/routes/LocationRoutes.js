module.exports = function (app, locationController) {
	app.get("/location", locationController.getAllLocations);

	//Categorias
	app.get("/location/categories", locationController.getCategories);
	app.get(
		"location/categories/:name",
		locationController.getLocationsByCategorie
	);

	//Crud
	app.get("/location/:id", locationController.getLocation);
	app.delete("/location/:id", locationController.deleteLocation);
	app.put("/location/:id", locationController.updateLocation);
	app.post("/location", locationController.createLocation);
	//Arrays
	app.post("/location/:id/rating", locationController.addReview);
	app.post("/location/:id/comment", locationController.addComment);
	app.post("/location/:id/photo", locationController.addPhoto);
};
