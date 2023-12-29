/* eslint-disable */

export const displayMap = locations => {
//   var map = L.map('map');  //to disable + - zoom
//   // var map = L.map('map', { zoomControl: false }).setView([31.111745, -118.113491], );
   
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     crossOrigin: ""
//   }).addTo(map);
   
//   const points = [];
//   locations.forEach((loc) => {
//     points.push([loc.coordinates[1], loc.coordinates[0]]);
//     L.marker([loc.coordinates[1], loc.coordinates[0]])
//       .addTo(map)
//       .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, { autoClose: false })
//       .openPopup();
//   });
   
//   const bounds = L.latLngBounds(points).pad(0.5);
//   map.fitBounds(bounds);
   
//   map.scrollWheelZoom.disable();  //to disable zoom by mouse wheel
var map = L.map('map').setView([20.9816762, 105.7825694], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([20.9816762, 105.7825694]).addTo(map);
var inforWindown = L.popup({ closeOnClick: false})
  .setLatLng(marker.getLatLng())
  .setContent('"<b>Nguyễn Văn Lộc</b>"');
  marker.bindPopup(inforWindown);
  inforWindown.openOn(map);
}