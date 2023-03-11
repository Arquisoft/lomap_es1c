module.exports = function (app,reviewController) {
    app.get('/review', reviewController.getAllReviews);
    app.post('/review', reviewController.addReview);
}