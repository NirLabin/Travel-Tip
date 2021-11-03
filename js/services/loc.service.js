import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';
export const locService = {
	getLocs,
	deleteLoc,
	findLocByID,
	addLoc,
};
let locs;
(function () {
	let tempLoc = storageService.loadFromStorage('locs');
	if (!tempLoc || !tempLoc.length) {
		tempLoc = [
			_createLoc({ name: 'Greatplace', lat: 32.047104, lng: 34.832384 }),
			_createLoc({ name: 'Neveragain', lat: 32.047201, lng: 34.832581 }),
		];
	}
	locs = tempLoc;
	_saveLocToStorage();
})();

function addLoc({ lat, lng, name }) {
	locs.push(_createLoc({ lat, lng, name, createdAt: new Date() }));
	_saveLocToStorage();
}

function deleteLoc(loc) {
	locs.splice(locs.indexOf(loc), 1);
	console.log(locs);
	_saveLocToStorage();
}

function getLocs() {
	return locs;
}

// CREATE

function _createLoc({ name, lat, lng, createdAt = '', updatedAt = '' }) {
	return { id: utilService.makeId(4), name, lat, lng, createdAt, updatedAt };
}

// Find location by id

function findLocByID(id) {
	return locs.find((loc) => loc.id === id);
}

// Local STORAGE

function _saveLocToStorage() {
	storageService.saveToStorage('locs', locs);
}
