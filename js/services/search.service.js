'use strict';
// `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`
// geolocation();
function geolocation(location = '22 Main st Boston MA') {
	const API_KEY = 'AIzaSyAgJS7jQeAOvo8loGt_gEvBHhvclV671rU';
	return getJSON(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${location},+Mountain+View,+CA&key=${API_KEY}`
	);
}
