import {createStruct} from "../solid/Solid.js";

async function checkStruct(session) {
	await createStruct(session);
}

export {checkStruct};
