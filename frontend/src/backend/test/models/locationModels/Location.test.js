const Location = require("../../../models/locationModels/Location");

describe("Location class methods", () => {
	let location;
	const name = "Central Park";
	const latitude = 40.785091;
	const longitude = -73.968285;
	const author = "John Doe";
	const review = { rating: 4, comment: "Great park!" };
	const photo = "https://example.com/photo.jpg";

	beforeEach(() => {
		location = new Location(name, latitude, longitude, author);
	});

	describe("addReview", () => {
		it("should add a review to the location's reviews array", () => {
			location.addReview(review);
			expect(location.reviews).toContain(review);
		});
	});

	describe("addPhoto", () => {
		it("should add a photo to the location's photos array", () => {
			location.addPhoto(photo);
			expect(location.photos).toContain(photo);
		});
	});

	describe("changePrivacy", () => {
		it("should change the location's privacy to public", () => {
			location.changePrivacy("public");
			expect(location.privacy).toBe("public");
		});

		it("should change the location's privacy to friends", () => {
			location.changePrivacy("friends");
			expect(location.privacy).toBe("friends");
		});

		it("should change the location's privacy to private", () => {
			location.changePrivacy("private");
			expect(location.privacy).toBe("private");
		});

		it("should throw an error if the privacy parameter is null or empty", () => {
			expect(() => location.changePrivacy(null)).toThrow(
				"Location privacy cannot be null or empty"
			);
			expect(() => location.changePrivacy("")).toThrow(
				"Location privacy cannot be null or empty"
			);
		});

		it("should throw an error if the privacy parameter is not 'public', 'friends', or 'private'", () => {
			expect(() => location.changePrivacy("unknown")).toThrow(
				"Location privacy must be public, friends or private"
			);
		});
	});

	describe("getRating", () => {
		it("should return 0.0 when there are no reviews", () => {
			expect(location.getRating()).toBe(0.0);
		});

		it("should return the correct rating when there are reviews", () => {
			location.addReview({ rating: 5, comment: "Amazing park!" });
			location.addReview({ rating: 3, comment: "Nice park." });
			expect(location.getRating()).toBe(4.0);
		});
	});
});

describe("Location constructor", () => {
	it("should create a new location with provided name, latitude, longitude, and author", () => {
		const location = new Location(
			"Test Location",
			50.12345,
			-120.6789,
			"Test Author"
		);
		expect(location.name).toBe("Test Location");
		expect(location.latitude).toBe(50.12345);
		expect(location.longitude).toBe(-120.6789);
		expect(location.author).toBe("Test Author");
	});

	it("should generate a random id if no id is provided", () => {
		const location = new Location(
			"Test Location",
			50.12345,
			-120.6789,
			"Test Author"
		);
		expect(location.id).toBeDefined();
	});

	it("should use the provided id if one is provided", () => {
		const location = new Location(
			"Test Location",
			50.12345,
			-120.6789,
			"Test Author",
			null,
			"12345"
		);
		expect(location.id).toBe("12345");
	});

	it("should generate a timestamp if none is provided", () => {
		const location = new Location(
			"Test Location",
			50.12345,
			-120.6789,
			"Test Author"
		);
		expect(location.timestamp).toBeDefined();
	});

	it("should use the provided timestamp if one is provided", () => {
		const location = new Location(
			"Test Location",
			50.12345,
			-120.6789,
			"Test Author",
			null,
			null,
			"123456789"
		);
		expect(location.timestamp).toBe("123456789");
	});

	it("should throw an error if no name is provided", () => {
		expect(
			() => new Location(null, 50.12345, -120.6789, "Test Author")
		).toThrow("Location name cannot be null or empty");
		expect(() => new Location("", 50.12345, -120.6789, "Test Author")).toThrow(
			"Location name cannot be null or empty"
		);
	});

	it("should throw an error if latitude or longitude is not a number", () => {
		expect(
			() => new Location("Test Location", "aaa", -120.6789, "Test Author")
		).toThrow("Location latitude and longitude must be numbers");
		expect(
			() => new Location("Test Location", 50.12345, "aa", "Test Author")
		).toThrow("Location latitude and longitude must be numbers");
	});

	it("should throw an error if no author is provided", () => {
		expect(
			() => new Location("Test Location", 50.12345, -120.6789, null)
		).toThrow("Location author cannot be null or empty");
		expect(
			() => new Location("Test Location", 50.12345, -120.6789, "")
		).toThrow("Location author cannot be null or empty");
	});
});
