import Photo from "../../../models/locationModels/Photo";

describe("Photo", () => {
	describe("constructor", () => {
		it("should throw an error if author is null or empty", () => {
			expect(() => {
				new Photo("", "photo name", "http://example.com/photo.jpg");
			}).toThrow("Photo author cannot be null or empty");
		});

		it("should throw an error if name is null or empty", () => {
			expect(() => {
				new Photo("author", "", "http://example.com/photo.jpg");
			}).toThrow("Photo name cannot be null or empty");
		});

		it("should throw an error if url is null or empty", () => {
			expect(() => {
				new Photo("author", "photo name", "");
			}).toThrow("Photo url cannot be null or empty");
		});

		it("should set the id if provided", () => {
			const photo = new Photo(
				"author",
				"photo name",
				"http://example.com/photo.jpg",
				null,
				"123"
			);
			expect(photo.id).toEqual("123");
		});

		it("should generate an id if not provided", () => {
			const photo = new Photo(
				"author",
				"photo name",
				"http://example.com/photo.jpg"
			);
			expect(photo.id).toMatch(/\d{13}_[a-z]{6}/);
		});

		it("should set the timestamp if provided", () => {
			const photo = new Photo(
				"author",
				"photo name",
				"http://example.com/photo.jpg",
				"2022-01-01T00:00:00Z"
			);
			expect(photo.timestamp).toEqual("2022-01-01T00:00:00Z");
		});

		it("should generate a timestamp if not provided", () => {
			const photo = new Photo(
				"author",
				"photo name",
				"http://example.com/photo.jpg"
			);
			expect(photo.timestamp).toMatch(/\d{13}/);
		});
	});
});
