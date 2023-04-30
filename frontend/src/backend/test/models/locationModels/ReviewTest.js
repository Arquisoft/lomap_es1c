import Review from "../../../models/locationModels/Review";

describe("Review", () => {
	it("should throw an error if rating is not an integer between 0 and 10", () => {
		expect(() => new Review("not a number", "John Doe")).toThrow(
			"Invalid rating value. Must be an integer between 0 and 10"
		);
		expect(() => new Review(-1, "John Doe")).toThrow(
			"Invalid rating value. Must be an integer between 0 and 10"
		);
		expect(() => new Review(11, "John Doe")).toThrow(
			"Invalid rating value. Must be an integer between 0 and 10"
		);
	});

	it("should throw an error if author is null or empty", () => {
		expect(() => new Review(8, null)).toThrow(
			"Review author cannot be null or empty"
		);
		expect(() => new Review(8, "")).toThrow(
			"Review author cannot be null or empty"
		);
		expect(() => new Review(8, "  ")).toThrow(
			"Review author cannot be null or empty"
		);
	});

	it("should generate a random id if one is not provided", () => {
		const review = new Review(8, "John Doe");
		expect(typeof review.id).toBe("string");
	});

	it("should use the provided id if one is provided", () => {
		const review = new Review(8, "John Doe", "abcd1234");
		expect(review.id).toBe("abcd1234");
	});
});
