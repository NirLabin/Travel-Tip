export const mapService = {
	initMap,
	addMarker,
	panTo,
};
var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 15,
		});
		console.log('Map!', gMap);

		// google.maps.event.addListener(map, 'click', function (e) {
		// 	// const locationName = prompt('Name of the location');
		// 	const elLocationName = document.querySelector('.location-name');
		// 	const locationName = elLocationName.value;
		// 	// Clearing the input
		// 	elLocationName.value = '';
		// 	if (!locationName) return;
		// 	if (addLocation({ name: locationName, coords: e.latLng }))
		// 		renderLocations();
		// });
	});
}

function addMarker(loc) {
	var marker = new google.maps.Marker({
		position: loc,
		map: gMap,
		title: 'Hello World!',
	});
	return marker;
}

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
}

function goToUserLocation(lat, lng) {
	panTo(lat, lng);
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	const API_KEY = 'AIzaSyAgJS7jQeAOvo8loGt_gEvBHhvclV671rU';
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}
