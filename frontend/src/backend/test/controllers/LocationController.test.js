const solid = require("../../solid/Solid.js");
const Location = require("../../models/locationModels/Location.js");
const Photo = require("../../models/locationModels/Photo.js");
const Review = require("../../models/locationModels/Review.js");
const locationController = require("../../controllers/LocationController.js");
jest.mock("../../solid/Solid.js");

jest.disableAutomock();

describe("getAllLocations() function", () => {
	it("should return all routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const locations = [{ name: "location1" }, { name: "location2" }];
		solid.getAllLocations.mockResolvedValue(locations);

		const result = await locationController.getAllLocations(session);

		expect(result).toEqual(locations);
	});

	it("should throw an error if there is a problem getting the locations", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.getAllLocations.mockRejectedValue("Error");
		await expect(locationController.getAllLocations(session)).rejects.toThrow(
			"Error al obtener las localizaciones"
		);
	});
});

describe("getLocation() function", () => {
	it("should return the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const route = ["ruta"];
		solid.getLocationById.mockResolvedValue(route);

		const result = await locationController.getLocation(session, "1");
		expect(result).toEqual(route);
	});

	it("should throw an error if the location is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		solid.getLocationById.mockResolvedValue(null);
		const result = await locationController.getLocation(session, "1");
		expect(result).toEqual(null);
	});

	it("should throw an error if there is a problem getting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.getLocationById.mockRejectedValue("error");

		await expect(locationController.getLocation(session, "1")).rejects.toThrow(
			"Error al obtener la localizacion"
		);
	});
});

describe("createLocation() function", () => {
	it("should return the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);

		const result = await locationController.createLocation(session, data);
		expect(result.name).toEqual(location.name);
		expect(result.latitude).toEqual(location.latitude);
		expect(result.longitude).toEqual(location.longitude);
	});

	it("should throw an error if the location fields are missing", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { description: "ruta de prueba" };
		await expect(
			locationController.createLocation(session, data)
		).rejects.toThrow("Faltan datos");
	});

	it("should throw an error if there is a problem adding the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		solid.saveLocation.mockRejectedValue("Error");

		await expect(
			locationController.createLocation(session, data)
		).rejects.toThrow("Error al crear la ruta");
	});
});

describe("updateLocation() function", () => {
	it("should update the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const newData = { name: "location2", category: "nueva" };
		solid.getLocationById.mockResolvedValue(location);
		solid.saveLocation.mockResolvedValue(true);
		const result = await locationController.updateLocation(
			session,
			location.id,
			newData
		);
		expect(result.name).toEqual(newData.name);
		expect(result.category).toEqual(newData.category);
	});

	it("should throw an error if there is a problem updating the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);

		solid.getLocationById.mockRejectedValue("Error");

		await expect(
			locationController.updateLocation(session, location.id, data)
		).rejects.toThrow("Error al actualizar la localizacion");
	});
});

describe("deleteLocation() function", () => {
	it("should delete the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		solid.getLocationById.mockResolvedValue(location);
		solid.deleteLocationById.mockResolvedValue(true);
		const result = await locationController.deleteLocation(
			session,
			location.id
		);
		expect(result).toEqual(location);
	});

	it("should throw an error if there is a problem deleting the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);

		solid.getLocationById.mockRejectedValue(location);
		solid.deleteLocationById.mockRejectedValue("Error");

		await expect(
			locationController.deleteLocation(session, location.id)
		).rejects.toThrow("Error al eliminar la localizacion");
	});
});

describe("addPhoto() function", () => {
	it("should return the photo", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const photoData = { imageJPG: "imagen.jpg" };
		const photo = new Photo(session.info.webId, photoData.imageJPG);
		solid.getLocationById.mockResolvedValue(location);
		solid.saveLocation.mockResolvedValue(true);

		const result = await locationController.addPhoto(
			session,
			"1",
			photoData,
			session.info.webId
		);

		expect(result.author).toEqual(photo.author);
		expect(result.photoImage).toEqual(photo.photoImage);
	});

	it("should throw an error if there is a problem adding the photo", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const photoData = { imageJPG: "imagen.jpg" };
		const photo = new Photo(session.info.webId, photoData.imageJPG);
		solid.saveLocation.mockRejectedValue("Error");

		solid.getLocationById.mockResolvedValue(location);
		await expect(
			locationController.addPhoto(session, "1", photoData, session.info.webId)
		).rejects.toThrow("Error añadiendo foto");
	});
});

describe("deletePhoto() function", () => {
	it("should return true", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.deletePhotoById.mockResolvedValue(true);

		const result = await locationController.deletePhoto(
			session,
			"1",
			"photoId"
		);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem deleting the photo", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.deletePhotoById.mockRejectedValue("Error");

		await expect(
			locationController.deletePhoto(session, "1", "photoId")
		).rejects.toThrow("Error eliminando la foto");
	});
});

describe("addReview() function", () => {
	it("should return the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const reviewData = { rating: 1, comment: "comment" };
		const review = new Review(
			reviewData.rating,
			reviewData.comment,
			session.info.webId
		);

		solid.getLocationById.mockResolvedValue(location);
		solid.saveLocation.mockResolvedValue(true);

		const result = await locationController.addReview(
			session,
			"1",
			session.info.webId,
			reviewData
		);

		expect(result.rating).toEqual(reviewData.rating);
		expect(result.comment).toEqual(reviewData.comment);
	});

	it("should throw an error if there is a problem adding the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const reviewData = { rating: 1, comment: "comment" };
		const review = new Review(
			reviewData.rating,
			reviewData.comment,
			session.info.webId
		);
		solid.getLocationById.mockResolvedValue(location);
		solid.saveLocation.mockRejectedValue("Error");

		await expect(
			locationController.addReview(session, "1", session.info.webId, reviewData)
		).rejects.toThrow("Error añadiendo la review");
	});
});

describe("updateReview() function", () => {
	it("should return the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const reviewData = { rating: 1, comment: "comment" };
		const review = new Review(
			reviewData.rating,
			reviewData.comment,
			session.info.webId
		);

		solid.updateReview.mockResolvedValue(location);

		const result = await locationController.updateReview(
			session,
			"1",
			reviewData
		);

		expect(result.rating).toEqual(reviewData.rating);
		expect(result.comment).toEqual(reviewData.comment);
	});

	it("should throw an error if there is a problem updatiung the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const reviewData = { rating: 1, comment: "comment" };
		const review = new Review(
			reviewData.rating,
			reviewData.comment,
			session.info.webId
		);
		solid.updateReview.mockRejectedValue("Error");

		await expect(
			locationController.updateReview(session, "1", reviewData)
		).rejects.toThrow("Error actualizando la review");
	});
});

describe("deleteReview() function", () => {
	it("should return true", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const reviewData = { rating: 1, comment: "comment" };
		const review = new Review(
			reviewData.rating,
			reviewData.comment,
			session.info.webId
		);

		solid.deleteReviewById.mockResolvedValue(true);

		const result = await locationController.deleteReview(session, "1");

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem deleting the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = {
			name: "location",
			latitude: 1,
			longitude: 1,
			category: "category",
		};
		const location = new Location(
			data.name,
			data.latitude,
			data.longitude,
			session.info.webId
		);
		const reviewData = { rating: 1, comment: "comment" };
		const review = new Review(
			reviewData.rating,
			reviewData.comment,
			session.info.webId
		);
		solid.deleteReviewById.mockRejectedValue("Error");

		await expect(locationController.deleteReview(session, "1")).rejects.toThrow(
			"Error eliminando la review"
		);
	});
});

describe("getCategories() function", () => {
	it("should return the categories", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const categories = ["category1", "category2", "category3"];

		solid.getCategories.mockResolvedValue(categories);

		const result = await locationController.getCategories();

		expect(result).toEqual(categories);
	});

	it("should throw an error if there is a problem adding the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const categories = ["category1", "category2", "category3"];

		solid.getCategories.mockRejectedValue("Error");

		await expect(locationController.getCategories()).rejects.toThrow(
			"Error al obtener las categorias"
		);
	});
});
