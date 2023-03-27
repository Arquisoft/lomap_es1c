module.exports = function (app,friendController) {
    app.get('/friend', friendController.getAllFriends);

}