module.exports = function (app, locationController) {
	app.get("/location", locationController.getAllLocations);

	//Categorias
	app.get("/location/category", locationController.getCategories);
	app.get("location/category/:name", locationController.getLocationsByCategory);

	//Crud
	app.get("/location/:id", locationController.getLocation);
	app.delete("/location/:id", locationController.deleteLocation);
	app.put("/location/:id", locationController.updateLocation);
	app.post("/location", locationController.createLocation2);
	//Arrays
	app.post("/location/:id/review", locationController.addReview);
	app.delete("/location/:id/review/:id", locationController.deleteReview);
	app.post("/location/:id/comment", locationController.addComment);
	app.delete("/location/:id/comment/:id", locationController.deleteComment);
	app.post("/location/:id/photo", locationController.addPhoto);
	app.delete("/location/:id/photo/:id", locationController.deletePhoto);
};
