export const locService = {
	getLocs,
	deleteLoc,
	findLocByID,
};
let idCount = 0;
const locs = [
	_createLoc({ name: 'Greatplace', lat: 32.047104, lng: 34.832384 }),
	_createLoc({ name: 'Neveragain', lat: 32.047201, lng: 34.832581 }),
];

//

function deleteLoc(loc) {
	locs.splice(locs.indexOf(loc), 1);
}

// GET

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

// CREATE

function _createLoc({ name, lat, lng, createdAt = '', updatedAt = '' }) {
	return { id: idCount++, name, lat, lng, createdAt, updatedAt };
}

// Find location by id

function findLocByID(id) {
	return locs.find((loc) => loc.id === id);
}

// Local STORAGE

function _saveLocToStorage() {
	saveToStorage('locs', locs);
}
