import Comment from "../../../models/locationModels/Comment";

describe("Comment", () => {
	test("creates a comment with author, text, timestamp, and id", () => {
		const author = "John Doe";
		const text = "This is a comment.";
		const timestamp = "123456789";
		const id = "abc123";
		const comment = new Comment(author, text, timestamp, id);

		expect(comment.author).toBe(author);
		expect(comment.text).toBe(text);
		expect(comment.timestamp).toBe(timestamp);
		expect(comment.id).toBe(id);
	});

	test("creates a comment with generated timestamp and id", () => {
		const author = "Jane Doe";
		const text = "This is another comment.";
		const comment = new Comment(author, text);

		expect(comment.author).toBe(author);
		expect(comment.text).toBe(text);
		expect(typeof comment.timestamp).toBe("string");
		expect(typeof comment.id).toBe("string");
	});

	test("throws an error if author is null or empty", () => {
		expect(() => new Comment("", "This is a comment.")).toThrow(
			"Comment author cannot be null or empty"
		);
		expect(() => new Comment(null, "This is a comment.")).toThrow(
			"Comment author cannot be null or empty"
		);
	});

	test("throws an error if text is null or empty", () => {
		expect(() => new Comment("John Doe", "")).toThrow(
			"Comment text cannot be null or empty"
		);
		expect(() => new Comment("John Doe", null)).toThrow(
			"Comment text cannot be null or empty"
		);
	});

	test("updates the text of the comment", () => {
		const author = "John Doe";
		const text = "This is a comment.";
		const comment = new Comment(author, text);

		expect(comment.text).toBe(text);

		comment.updateText("This is an updated comment.");

		expect(comment.text).toBe("This is an updated comment.");
	});

	test("generates a random id", () => {
		const author = "John Doe";
		const text = "This is a comment.";
		const comment1 = new Comment(author, text);
		const comment2 = new Comment(author, text);

		expect(comment1.id).not.toBe(comment2.id);
	});
});
