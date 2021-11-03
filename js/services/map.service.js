export const mapService = {
  initMap,
  addMarker,
  getMap,
  panTo,
  goToUserLoc,
};

let gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  return _connectGoogleApi().then(() => {
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    });

    google.maps.event.addListener(gMap, 'click', function (e) {
      var latLng = e.latLng;
      var name = prompt('Enter the place name');
      let lat = latLng.lat();
      let lng = latLng.lng();
      locService.addLoc({ lat, lng, name });
      console.log(locService.getWeather(lat, lng));
    });
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
  const laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function getMap() {
  return gMap;
}

function goToUserLoc(lat, lng) {
  panTo(lat, lng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = 'AIzaSyAgJS7jQeAOvo8loGt_gEvBHhvclV671rU';
  const elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);
  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}
