import Location from "../../../models/locationModels/Location";

describe("Location class", () => {
	let location;

	beforeEach(() => {
		location = new Location(
			"Test Location",
			123.456,
			-123.456,
			"public",
			"Test Author",
			"Test Category"
		);
	});

	it("should create a new location object", () => {
		expect(location).toBeInstanceOf(Location);
		expect(location.name).toEqual("Test Location");
		expect(location.latitude).toEqual(123.456);
		expect(location.longitude).toEqual(-123.456);
		expect(location.privacy).toEqual("public");
		expect(location.author).toEqual("Test Author");
		expect(location.category).toEqual("Test Category");
	});

	it("should throw an error if name is null or empty", () => {
		expect(
			() => new Location(null, 123.456, -123.456, "public", "Test Author")
		).toThrow("Location name cannot be null or empty");
		expect(
			() => new Location("", 123.456, -123.456, "public", "Test Author")
		).toThrow("Location name cannot be null or empty");
	});

	it("should throw an error if privacy is null or empty", () => {
		expect(
			() =>
				new Location("Test Location", 123.456, -123.456, null, "Test Author")
		).toThrow("Location privacy cannot be null or empty");
		expect(
			() => new Location("Test Location", 123.456, -123.456, "", "Test Author")
		).toThrow("Location privacy cannot be null or empty");
	});

	it("should throw an error if latitude or longitude is not a number", () => {
		expect(
			() =>
				new Location(
					"Test Location",
					"invalid",
					-123.456,
					"public",
					"Test Author"
				)
		).toThrow("Location latitude and longitude must be numbers");
		expect(
			() =>
				new Location(
					"Test Location",
					123.456,
					"invalid",
					"public",
					"Test Author"
				)
		).toThrow("Location latitude and longitude must be numbers");
	});

	it("should throw an error if author is null or empty", () => {
		expect(
			() => new Location("Test Location", 123.456, -123.456, "public", null)
		).toThrow("Location author cannot be null or empty");
		expect(
			() => new Location("Test Location", 123.456, -123.456, "public", "")
		).toThrow("Location author cannot be null or empty");
	});

	it("should change privacy of location", () => {
		location.changePrivacy("private");
		expect(location.privacy).toEqual("private");
	});

	it("should calculate the rating of the location based on its reviews", () => {
		location.reviews = [
			{ rating: 5 },
			{ rating: 3 },
			{ rating: 4 },
			{ rating: 2 },
			{ rating: 5 },
		];
		expect(location.getRating()).toEqual(3.8);
	});
});
