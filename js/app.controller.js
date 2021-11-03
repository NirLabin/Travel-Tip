import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;

function onInit() {
	mapService
		.initMap()
		.then(() => {
			const map = mapService.getMap();
			google.maps.event.addListener(map, 'click', function (e) {
				const latLng = e.latLng;
				const name = prompt('Enter the place name');
				if (!name) return;
				const [lat, lng] = [latLng.lat(), latLng.lng()];
				locService.addLoc({ lat, lng, name });
				onGetLocs();
			});
		})
		.catch(() => console.log('Error: cannot init map'));
	onGetUserPos();
	onGetLocs();
	$('.btn-user-loc').click(onGoToUserLoc);
	$('.btn-copy-link').click(onCopyLink);
	$('.btn-search').click(onSearch);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function onAddMarker() {
	mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
	renderLocs(locService.getLocs());
}

function onGetUserPos() {
	getPosition()
		.then((pos) => {
			const API_KEY = 'AIzaSyAgJS7jQeAOvo8loGt_gEvBHhvclV671rU';
			const { latitude, longitude } = pos.coords;
			getJSON(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
			).then((res) => {
				const address = res.results[0].formatted_address;
				$('.user-pos').text(`${address}`);
			});
			//  $('.user-pos').text(`Latitude: ${latitude} - Longitude: ${longitude}`);
		})
		.catch((err) => console.log('err!!!', err));
}

function onGoToUserLoc() {
	getPosition().then((pos) =>
		mapService.goToUserLoc(pos.coords.latitude, pos.coords.longitude)
	);
}

function onCopyLink() {
	getPosition()
		.then((pos) => {
			const link = `https://nirlabin.github.io/Travel-Tip/index.html?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`;
			navigator.clipboard.writeText(link);
			alert('Link copied successfully');
		})
		.catch((err) => alert('Something went wrong, try again later'));
}

function onPanTo() {
	mapService.panTo(35.6895, 139.6917);
}

// //////////////////////////
function onSearch() {
	const loc = $('.input-search').val();
	geolocation(loc).then((res) => {
		const { results } = res;
		const { lat, lng } = results[0].geometry.location;
		mapService.panTo(lat, lng);
		locService.addLoc({ lat, lng });
	});
}

function onLocItem(e) {
	const curEl = e.target;
	if (!hasClass(curEl, 'btn')) return;
	const elLocItem = curEl.closest('.loc-item');
	const itemID = elLocItem.getAttribute('data-loc-id');
	const loc = locService.findLocByID(+itemID);
	if (curEl.innerText === 'Delete') onDeleteLoc(loc);
	else mapService.panTo(loc.lat, loc.lng);
}

// ON
function onDeleteLoc(loc) {
	locService.deleteLoc(loc);
	onGetLocs();
}

////////////////////////////////// RENDER ///////////////////
function renderLocs(locs) {
	// Clearing the list
	$('.locs-list').html('');
	locs.forEach((loc) => renderLoc(loc));
	$('.loc-item').click(onLocItem);
}

function renderLoc(loc) {
	const elLocList = document.querySelector('.locs-list');
	const strHtml = `
    <li class="loc-item flex column" data-loc-id="${loc.id}">
        <span class="loc-name">${loc.name}</span>
        <span class="loc-cords">Latitude: ${loc.lat} - Longitude: ${loc.lng}</span>
        <div class="btns-box">
            <button class="btn btn-go">Go</button>
            <button class="btn btn-delete">Delete</button>
        </div>
    </li>`;
	elLocList.insertAdjacentHTML('afterbegin', strHtml);
}
// NIR
