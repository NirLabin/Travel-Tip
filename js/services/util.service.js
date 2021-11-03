'use strict';
function getJSON(url, errorMsg = 'Something went wrong') {
	return fetch(url).then((response) => {
		if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

		return response.json();
	});
}
function hasClass(el, className) {
	return el.classList.contains(className);
}
