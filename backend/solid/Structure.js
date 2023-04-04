const { getSolidDataset, createContainerAt } = require("@inrupt/solid-client");
async function construirEstructura(Session, myBaseUrl) {
	try {
		try {
			await getSolidDataset(myBaseUrl + "LoMap/", { fetch: Session.fetch });
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/routes", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/routes",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/maps", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/maps",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/locations", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/locations",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/locations/comments", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/locations/comments",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/locations/photos", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/locations/photos",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/locations/reviews", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/locations/reviews",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getSolidDataset(myBaseUrl + "LoMap/locations/locations", {
				fetch: Session.fetch,
			});
		} catch (e) {
			await createContainerAt(
				myBaseUrl + "LoMap/locations/locations",
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	construirEstructura,
};