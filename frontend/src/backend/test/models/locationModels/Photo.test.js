import Photo from "../../../models/locationModels/Photo"

describe("Photo", () => {
	describe("constructor", () => {
		it("should create a new photo with author, imageJPG, timestamp, and id properties", () => {
			const author = "John Doe";
			const imageJPG = "someImage.jpg";

			const photo = new Photo(author, imageJPG);

			expect(photo.author).toBe(author);
			expect(photo.imageJPG).toBe(imageJPG);
			expect(typeof photo.timestamp).toBe("string");
			expect(typeof photo.id).toBe("string");
		});

		it("should throw an error if author is null or empty", () => {
			const author = "";
			const imageJPG = "someImage.jpg";

			expect(() => new Photo(author, imageJPG)).toThrow(
				"Photo author cannot be null or empty"
			);
		});

		it("should throw an error if imageJPG is null or empty", () => {
			const author = "John Doe";
			const imageJPG = "";

			expect(() => new Photo(author, imageJPG)).toThrow(
				"Photo cannot be null or empty"
			);
		});
	});
});
