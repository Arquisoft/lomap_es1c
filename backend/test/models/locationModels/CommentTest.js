const Comment = require("../../models/locationModels/Comment");

describe("test backend", function () {
	it("test backend.Comment.updateText", function (done) {
		let text = "test text";
		let comment = new Comment("prueba", "prueba");
		comment.updateText(text);
		assert.equal(comment.text, text);
		done();
	});
});
