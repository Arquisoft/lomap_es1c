const Review = require("../../../models/locationModels/Review");

describe("Review constructor", () => {
	it("should create a new Review object with valid arguments", () => {
		const review = new Review(8, "Great location", "John Doe");
		expect(review).toBeInstanceOf(Review);
		expect(review.rating).toEqual(8);
		expect(review.comment).toEqual("Great location");
		expect(review.author).toEqual("John Doe");
	});

	it("should throw an error if the rating is not an integer", () => {
		expect(() => new Review(7.5, "Good", "Jane Doe")).toThrow(
			"Invalid rating value. Must be an integer smaller than 10"
		);
	});

	it("should throw an error if the rating is greater than 10", () => {
		expect(() => new Review(11, "Amazing", "Bob Smith")).toThrow(
			"Invalid rating value. Must be an integer smaller than 10"
		);
	});

	it("should throw an error if the author is null or empty", () => {
		expect(() => new Review(6, "Nice", null)).toThrow(
			"Review author cannot be null or empty"
		);
		expect(() => new Review(6, "Nice", "")).toThrow(
			"Review author cannot be null or empty"
		);
	});
});
