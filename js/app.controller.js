import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
  mapService
    .initMap()
    .then(() => console.log('Map is ready'))
    .catch(() => console.log('Error: cannot init map'));

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
  locService.getLocs().then((locs) => renderLocs(locs));
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
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
      // alert('Link copied successfully');
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

// RENDER
function renderLocs(locs) {
  locs.forEach((loc) => renderLoc(loc));
  $('.loc-item').click(onLocItem);
}

function renderLoc(loc) {
  const elLocList = document.querySelector('.locs-list');
  const strHtml = `
    <li class="loc-item" data-loc-id="${loc.id}">
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
