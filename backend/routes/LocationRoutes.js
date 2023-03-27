module.exports = function (app, locationController) {
    
    app.get('/location', locationController.getAllLocations);

    
    app.get('/location/categories',locationController.getCategories);

    app.get('/location/:id', locationController.getLocation);
    
    app.delete('/location/:id', locationController.deleteLocation);
    
    app.put('/location/:id', locationController.updateLocation);
    app.post('/location/:id/rating',locationController.setRating);
    app.post('/location', locationController.createLocation);
    app.post('/location/:id/comment', locationController.addComment);
    app.post('/location/:id/photos', locationController.addPhoto);

    
}