module.exports = function (app, friendController) {
	//Friends
	app.get("/friend", friendController.getAllFriends);
	app.post("/friend", friendController.addFriend);
	app.delete("/friend/:id", friendController.deleteFriend);

	//Locations
	app.get("/friend/location", friendController.getAllLocationsFromFriends);
	app.get("/friend/:id/location", friendController.getFriendLocations);
	app.get(
		"/friend/location/category/:name",
		friendController.getAllLocationsByCategory
	);
};
