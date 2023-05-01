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

import {getAllFriends,
	deleteFriend,
	getFriendLocations,
	sendFriendRequest,
	getAllRequests,
	acceptRequest,
	rejectRequest,
	getFriendLocationById} from "../../controllers/FriendController.js"

jest.mock("../../solid/Solid.js");

jest.disableAutomock();

describe("getAllFriends() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const friends = [
			{ name: "Juan", webId: "https://example.com/juan" },
			{ name: "Pedro", webId: "https://example.com/pedro" },
		];
		solidgetAllFriends.mockResolvedValue(friends);

		const result = await getAllFriends(session);

		expect(result).toEqual(friends);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solidgetAllFriends.mockRejectedValue("Error");
		await expect(getAllFriends(session)).rejects.toThrow(
			"Ha ocurrido un error al obtener los amigos"
		);
	});
});

describe("deleteFriend() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const friends = [
			{ name: "Juan", webId: "https://example.com/juan" },
			{ name: "Pedro", webId: "https://example.com/pedro" },
		];
		soliddeleteFriendById.mockResolvedValue(true);

		const result = await deleteFriend(session, "1");

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		soliddeleteFriendById.mockRejectedValue("Error");
		await expect(deleteFriend(session, "1")).rejects.toThrow(
			"Ha ocurrido un error al eliminar el amigo"
		);
	});
});

describe("getFriendLocations() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const friends = [
			{ name: "Juan", webId: "https://example.com/juan" },
			{ name: "Pedro", webId: "https://example.com/pedro" },
		];
		const locations = [
			{
				name: "Casa",
				description: "Casa de Juan",
				latitude: "40.4167",
				longitude: "-3.70325",
				webId: "https://example.com/juan",
			},
		];
		solidgetAllLocations.mockResolvedValue(locations);

		const result = await getFriendLocations(session, "webid");

		expect(result).toEqual(locations);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solidgetAllLocations.mockRejectedValue("Error");
		await expect(
			getFriendLocations(session, "webid")
		).rejects.toThrow("Ha ocurrido un error al obtener las localizaciones");
	});
});

describe("getFriendLocationById() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const friends = [
			{ name: "Juan", webId: "https://example.com/juan" },
			{ name: "Pedro", webId: "https://example.com/pedro" },
		];
		const locations = [
			{
				name: "Casa",
				description: "Casa de Juan",
				latitude: "40.4167",
				longitude: "-3.70325",
				webId: "https://example.com/juan",
			},
		];
		solidgetLocationById.mockResolvedValue(locations[1]);

		const result = await getFriendLocationById(
			session,
			"webid",
			1
		);

		expect(result).toEqual(locations[1]);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solidgetLocationById.mockRejectedValue("Error");
		await expect(
			getFriendLocationById(session, "webid", 1)
		).rejects.toThrow("Ha ocurrido un error al obtener la localizacion");
	});
});

describe("sendFriendRequest() function", () => {
	it("should return true", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };

		solidmandarSolicitud.mockResolvedValue(true);

		const result = await sendFriendRequest(session, data);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem sending the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };
		solidmandarSolicitud.mockRejectedValue("Error");
		await expect(
			sendFriendRequest(session, data)
		).rejects.toThrow("Ha ocurrido un error al enviar la solicitud");
	});

	it("should throw an error if there is a problem with the data for the user", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { aaaaa: "Juan", bbbb: "https://example.com/juan" };

		solidmandarSolicitud.mockResolvedValue(true);
		await expect(
			sendFriendRequest(session, data)
		).rejects.toThrow("Ha ocurrido un error al enviar la solicitud");
	});
});

describe("getAllRequests() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const requests = [{ request: "request1" }, { request: "request2" }];
		solidgetAllSolicitudes.mockResolvedValue(requests);

		const result = await getAllRequests(session);

		expect(result).toEqual(requests);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		const requests = [{ request: "request1" }, { request: "request2" }];
		solidgetAllSolicitudes.mockRejectedValue("Error");

		await expect(getAllRequests(session)).rejects.toThrow(
			"Ha ocurrido un error al obtener las solicitudes"
		);
	});
});

describe("acceptRequest() function", () => {
	it("should accept the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		const data = { name: "Juan", webId: "https://example.com/juan" };
		solidaceptarSolicitud.mockResolvedValue(true);

		const result = await acceptRequest(
			session,
			data.webId,
			data.name
		);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem accepting the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };
		solidaceptarSolicitud.mockRejectedValue("Error");

		await expect(
			acceptRequest(session, data.webId, data.name)
		).rejects.toThrow("Ha ocurrido un error al aceptar la solicitud");
	});
});

describe("rejectRequest() function", () => {
	it("should accept the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		const data = { name: "Juan", webId: "https://example.com/juan" };
		soliddenegarSolicitud.mockResolvedValue(true);

		const result = await rejectRequest(session, data.webId);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem accepting the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };
		soliddenegarSolicitud.mockRejectedValue("Error");

		await expect(
			rejectRequest(session, data.webId)
		).rejects.toThrow("Ha ocurrido un error al rechazar la solicitud");
	});
});
