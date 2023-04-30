const solid = require("../solid/Solid.js");

async function checkStruct(session) {
	await solid.createStruct(session);
}

exports.checkStruct = checkStruct;
