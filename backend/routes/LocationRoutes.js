module.exports = function (app, locationController) {
    
    app.get('/location/:id', locationController.getLocation);
    app.get('/location', locationController.getAllLocations);

    app.post('/location', locationController.createLocation);
    app.put('/location/:id', locationController.updateLocation);
    app.delete('/:id', locationController.deleteLocation);

    app.put('/location/:id/rating',locationController.setRating);
    app.post('/location/:id/comment', locationController.addComment);
    app.post('/location/:id/photos', locationController.addPhoto);

    app.get('/location/categories',locationController.getCategories);
}