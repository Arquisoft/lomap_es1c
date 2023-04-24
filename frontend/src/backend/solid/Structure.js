const {
	getSolidDataset,
	createContainerAt,
	overwriteFile,
	getFile,
	deleteSolidDataset,
} = require("@inrupt/solid-client");

const friends = require("./Friends.js");

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
			await getFile(myBaseUrl + "LoMap/routes.jsonld", {
				fetch: Session.fetch,
			});
		} catch (e) {
			let file = await estructuraJsonLD();
			await overwriteFile(myBaseUrl + "LoMap/routes.jsonld", file, {
				fetch: Session.fetch,
			});
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
			await getFile(myBaseUrl + "LoMap/locations/photos.jsonld", {
				fetch: Session.fetch,
			});
		} catch (e) {
			let file = await estructuraJsonLD();
			await overwriteFile(
				myBaseUrl + "LoMap/locations/photos.jsonld",
				file,
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getFile(myBaseUrl + "LoMap/locations/reviews.jsonld", {
				fetch: Session.fetch,
			});
		} catch (e) {
			let file = await estructuraJsonLD();
			await overwriteFile(
				myBaseUrl + "LoMap/locations/reviews.jsonld",
				file,
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}

		try {
			await getFile(myBaseUrl + "LoMap/locations/locations.jsonld", {
				fetch: Session.fetch,
			});
		} catch (e) {
			let file = await estructuraJsonLD();
			await overwriteFile(
				myBaseUrl + "LoMap/locations/locations.jsonld",
				file,
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}
		try {
			await getFile(myBaseUrl + "LoMap/friends.jsonld", {
				fetch: Session.fetch,
			});
		} catch (e) {
			let file = await estructuraJsonLD();
			await overwriteFile(
				myBaseUrl + "LoMap/friends.jsonld",
				file,
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
		}
		try {
			await getFile(myBaseUrl + "LoMap/solicitudes.jsonld", {
				fetch: Session.fetch,
			});
		} catch (e) {
			let file = await estructuraJsonLD();
			await overwriteFile(
				myBaseUrl + "LoMap/solicitudes.jsonld",
				file,
				{ fetch: Session.fetch } // fetch from authenticated Session
			);
			await friends.darPermisosPublicos(Session, myBaseUrl + "LoMap/solicitudes.jsonld", {read: true, write: true,})
		}
	} catch (error) {
		console.log(error);
	}
}

async function estructuraJsonLD() {
	let JsonLD_File = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: [],
	};

	let blob = new Blob([JSON.stringify(JsonLD_File)], {
		type: "application/jsonld",
	});

	const arrayBuffer = await blob.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);

	return buffer;
}

module.exports = {
	construirEstructura,
};
