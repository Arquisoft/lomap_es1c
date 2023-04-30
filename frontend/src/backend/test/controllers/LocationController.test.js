import {createLocation,
getAllLocations,
getLocation,
getCategories,
deleteLocation,
updateLocation,
addReview,
addPhoto,
deletePhoto,
deleteReview,
updateReview} from "../../controllers/LocationController"

import Location from "../../models/locationModels/Location"
import Photo from "../../models/locationModels/Photo"
import Review from "../../models/locationModels/Review"
import {
	createStruct as solidcreateStruct,
	saveLocation as solidsaveLocation,
	getAllLocations as solidgetAllLocations,
	getLocationById as solidgetLocationById,
	deleteLocationById as soliddeleteLocationById,
	deleteReviewById as soliddeleteReviewById,
	deletePhotoById as  soliddeletePhotoById,
	addRoute as solidaddRoute,
	getAllRoutes as solidgetAllRoutes,
	getRouteById as solidgetRouteById,
	deleteRouteById as soliddeleteRouteById,
	aceptarSolicitud as solidaceptarSolicitud,
	getAllFriends as solidgetAllFriends,
	deleteFriendById as soliddeleteFriendById,
	getCategories as solidgetCategories,
	denegarSolicitud as soliddenegarSolicitud,
	mandarSolicitud as solidmandarSolicitud,
	getAllSolicitudes as solidgetAllSolicitudes,
	updateReview as solidupdateReview,
	updatePhoto as solidupdatePhoto
} from "../../solid/Solid.js";

jest.mock("../../solid/Solid.js");

jest.disableAutomock();

describe("getAllLocations() function", () => {
	it("should return all routes", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const locations = [{ name: "location1" }, { name: "location2" }];
		solidgetAllLocations.mockResolvedValue(locations);

		const result = await getAllLocations(session);

		expect(result).toEqual(locations);
	});

	it("should throw an error if there is a problem getting the locations", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solidgetAllLocations.mockRejectedValue("Error");
		await expect(getAllLocations(session)).rejects.toThrow(
			"Error al obtener las localizaciones"
		);
	});
});

describe("getLocation() function", () => {
	it("should return the location", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const route = ["ruta"];
		solidgetLocationById.mockResolvedValue(route);

		const result = await getLocation(session, "1");
		expect(result).toEqual(route);
	});

	it("should throw an error if the location is not found", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		solidgetLocationById.mockResolvedValue(null);
		const result = await getLocation(session, "1");
		expect(result).toEqual(null);
	});

	it("should throw an error if there is a problem getting the route", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solidgetLocationById.mockRejectedValue("error");

		await expect(getLocation(session, "1")).rejects.toThrow(
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

		const result = await createLocation(session, data);
		expect(result.name).toEqual(location.name);
		expect(result.latitude).toEqual(location.latitude);
		expect(result.longitude).toEqual(location.longitude);
	});

	it("should throw an error if the location fields are missing", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { description: "ruta de prueba" };
		await expect(
			createLocation(session, data)
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
		solidsaveLocation.mockRejectedValue("Error");

		await expect(
			createLocation(session, data)
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
		solidgetLocationById.mockResolvedValue(location);
		solidsaveLocation.mockResolvedValue(true);
		const result = await updateLocation(
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

		solidgetLocationById.mockRejectedValue("Error");

		await expect(
			updateLocation(session, location.id, data)
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
		solidgetLocationById.mockResolvedValue(location);
		soliddeleteLocationById.mockResolvedValue(true);
		const result = await deleteLocation(
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

		solidgetLocationById.mockRejectedValue(location);
		soliddeleteLocationById.mockRejectedValue("Error");

		await expect(
			deleteLocation(session, location.id)
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
		solidgetLocationById.mockResolvedValue(location);
		solidsaveLocation.mockResolvedValue(true);

		const result = await addPhoto(
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
		solidsaveLocation.mockRejectedValue("Error");

		solidgetLocationById.mockResolvedValue(location);
		await expect(
			addPhoto(session, "1", photoData, session.info.webId)
		).rejects.toThrow("Error añadiendo foto");
	});
});

describe("deletePhoto() function", () => {
	it("should return true", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		soliddeletePhotoById.mockResolvedValue(true);

		const result = await deletePhoto(
			session,
			"1",
			"photoId"
		);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem deleting the photo", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		soliddeletePhotoById.mockRejectedValue("Error");

		await expect(
			deletePhoto(session, "1", "photoId")
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

		solidgetLocationById.mockResolvedValue(location);
		solidsaveLocation.mockResolvedValue(true);

		const result = await addReview(
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
		solidgetLocationById.mockResolvedValue(location);
		solidsaveLocation.mockRejectedValue("Error");

		await expect(
			addReview(session, "1", session.info.webId, reviewData)
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

		solidupdateReview.mockResolvedValue(location);

		const result = await updateReview(
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
		solidupdateReview.mockRejectedValue("Error");

		await expect(
			updateReview(session, "1", reviewData)
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

		soliddeleteReviewById.mockResolvedValue(true);

		const result = await deleteReview(session, "1");

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
		soliddeleteReviewById.mockRejectedValue("Error");

		await expect(deleteReview(session, "1")).rejects.toThrow(
			"Error eliminando la review"
		);
	});
});

describe("getCategories() function", () => {
	it("should return the categories", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const categories = ["category1", "category2", "category3"];

		solidgetCategories.mockResolvedValue(categories);

		const result = await getCategories();

		expect(result).toEqual(categories);
	});

	it("should throw an error if there is a problem adding the review", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const categories = ["category1", "category2", "category3"];

		solidgetCategories.mockRejectedValue("Error");

		await expect(getCategories()).rejects.toThrow(
			"Error al obtener las categorias"
		);
	});
});
