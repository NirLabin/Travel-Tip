export const utilService = {
	getJSON,
	hasClass,
	makeId,
};

function getJSON(url, errorMsg = 'Something went wrong') {
	return fetch(url).then((response) => {
		if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

		return response.json();
	});
}
function hasClass(el, className) {
	return el.classList.contains(className);
}

function makeId(length = 6) {
	var txt = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++)
		txt += possible.charAt(Math.floor(Math.random() * possible.length));

	return txt;
}
