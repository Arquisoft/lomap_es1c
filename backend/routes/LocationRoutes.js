module.exports = function (app, locationController) {
    app.post('/location', locationController.createLocation);
    app.get('/location', locationController.getAllLocations);

    app.get('/location/:id', locationController.getLocation);
    app.put('/location/:id', locationController.updateLocation);
    app.delete('/:id', locationController.deleteLocation);

    app.post('/location/:id/reviews', locationController.addReview);
    app.post('/location/:id/photos', locationController.addPhoto);
}