export const locService = {
	getLocs,
};

const locs = [
	{ name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
	{ name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
];

// GET

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

// CREATE

function _createLoc({ id, name, lat, lng, createdAt, updatedAt }) {
	return { id, name, lat, lng, createdAt, updatedAt };
}

// Local STORAGE

function _saveLocToStorage() {
	saveToStorage('locs', locs);
}
