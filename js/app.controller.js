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
    .then(() => {
      console.log('Map is ready');
    })
    .catch(() => console.log('Error: cannot init map'));

  $('.btn-user-loc').click(onGoToUserLoc);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log('Adding a marker');
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    // document.querySelector('.locs').innerText = JSON.stringify(locs);
    renderLocs(locs);
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}

function onGoToUserLoc() {
  getPosition().then((pos) =>
    mapService.goToUserLoc(pos.coords.latitude, pos.coords.longitude)
  );
}

function onPanTo() {
  console.log('Panning the Map');
  mapService.panTo(35.6895, 139.6917);
}
console.log(locService.getLocs);

// //////////////////////////

function onLocItem(e) {
  const curEl = e.target;
  if (!hasClass(curEl, 'btn')) return;

  const elLocItem = curEl.closest('.loc-item');
  const itemID = elLocItem.getAttribute('data-loc-id');
  const loc = locService.findLocByID(itemID);

  if (curEl.innerText === 'Delete') locService.deleteLoc(loc);
  else mapService.panTo(loc.lat, loc.lng);
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
