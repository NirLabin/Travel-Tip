import { utilService } from './util.service.js';

export function geolocation(location = '22 Main st Boston MA') {
	const API_KEY = 'AIzaSyAgJS7jQeAOvo8loGt_gEvBHhvclV671rU';
	return utilService.getJSON(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${location},+Mountain+View,+CA&key=${API_KEY}`
	);
}
