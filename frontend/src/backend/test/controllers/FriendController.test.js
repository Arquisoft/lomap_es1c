const solid = require("../../solid/Solid.js");
const Friend = require("../../models/Friend.js");
const FriendRequest = require("../../models/FriendRequest.js");
const friendController = require("../../controllers/FriendController.js");
jest.mock("../../solid/Solid.js");

jest.disableAutomock();

describe("getAllFriends() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const friends = [
			{ name: "Juan", webId: "https://example.com/juan" },
			{ name: "Pedro", webId: "https://example.com/pedro" },
		];
		solid.getAllFriends.mockResolvedValue(friends);

		const result = await friendController.getAllFriends(session);

		expect(result).toEqual(friends);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.getAllFriends.mockRejectedValue("Error");
		await expect(friendController.getAllFriends(session)).rejects.toThrow(
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
		solid.deleteFriendById.mockResolvedValue(true);

		const result = await friendController.deleteFriend(session, "1");

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.deleteFriendById.mockRejectedValue("Error");
		await expect(friendController.deleteFriend(session, "1")).rejects.toThrow(
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
		solid.getAllLocations.mockResolvedValue(locations);

		const result = await friendController.getFriendLocations(session, "webid");

		expect(result).toEqual(locations);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.getAllLocations.mockRejectedValue("Error");
		await expect(
			friendController.getFriendLocations(session, "webid")
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
		solid.getLocationById.mockResolvedValue(locations[1]);

		const result = await friendController.getFriendLocationById(
			session,
			"webid",
			1
		);

		expect(result).toEqual(locations[1]);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		solid.getLocationById.mockRejectedValue("Error");
		await expect(
			friendController.getFriendLocationById(session, "webid", 1)
		).rejects.toThrow("Ha ocurrido un error al obtener la localizacion");
	});
});

describe("sendFriendRequest() function", () => {
	it("should return true", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };

		solid.mandarSolicitud.mockResolvedValue(true);

		const result = await friendController.sendFriendRequest(session, data);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem sending the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };
		solid.mandarSolicitud.mockRejectedValue("Error");
		await expect(
			friendController.sendFriendRequest(session, data)
		).rejects.toThrow("Ha ocurrido un error al enviar la solicitud");
	});

	it("should throw an error if there is a problem with the data for the user", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { aaaaa: "Juan", bbbb: "https://example.com/juan" };

		solid.mandarSolicitud.mockResolvedValue(true);
		await expect(
			friendController.sendFriendRequest(session, data)
		).rejects.toThrow("Ha ocurrido un error al enviar la solicitud");
	});
});

describe("getAllRequests() function", () => {
	it("should return all friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const requests = [{ request: "request1" }, { request: "request2" }];
		solid.getAllSolicitudes.mockResolvedValue(requests);

		const result = await friendController.getAllRequests(session);

		expect(result).toEqual(requests);
	});

	it("should throw an error if there is a problem getting the friends", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		const requests = [{ request: "request1" }, { request: "request2" }];
		solid.getAllSolicitudes.mockRejectedValue("Error");

		await expect(friendController.getAllRequests(session)).rejects.toThrow(
			"Ha ocurrido un error al obtener las solicitudes"
		);
	});
});

describe("acceptRequest() function", () => {
	it("should accept the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		const data = { name: "Juan", webId: "https://example.com/juan" };
		solid.aceptarSolicitud.mockResolvedValue(true);

		const result = await friendController.acceptRequest(
			session,
			data.webId,
			data.name
		);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem accepting the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };
		solid.aceptarSolicitud.mockRejectedValue("Error");

		await expect(
			friendController.acceptRequest(session, data.webId, data.name)
		).rejects.toThrow("Ha ocurrido un error al aceptar la solicitud");
	});
});

describe("rejectRequest() function", () => {
	it("should accept the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };

		const data = { name: "Juan", webId: "https://example.com/juan" };
		solid.denegarSolicitud.mockResolvedValue(true);

		const result = await friendController.rejectRequest(session, data.webId);

		expect(result).toEqual(true);
	});

	it("should throw an error if there is a problem accepting the request", async () => {
		const session = { info: { webId: "https://example.com/johndoe" } };
		const data = { name: "Juan", webId: "https://example.com/juan" };
		solid.denegarSolicitud.mockRejectedValue("Error");

		await expect(
			friendController.rejectRequest(session, data.webId)
		).rejects.toThrow("Ha ocurrido un error al rechazar la solicitud");
	});
});
