var map = L.map('map').setView([29.8884, -97.9384], 14);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

// ===== Member 1: Buffer =====
function addMarkerWithBuffer(lat, lng, radius, units) {
  L.marker([lat, lng]).addTo(map)
      .bindPopup("Texas State University<br>Buffer: " + radius + " " + units);

  var point = turf.point([lng, lat]);
  var buffered = turf.buffer(point, radius, { units: units });

  L.geoJSON(buffered, {
      style: { color: 'red', fillColor: '#f03', fillOpacity: 0.3 }
  }).addTo(map);
}

// ===== Member 2: Along =====
function pointAlongLine(coordinates, distance, units) {
  var line = turf.lineString(coordinates);
  var leafletCoords = coordinates.map(function (c) { return [c[1], c[0]]; });
  L.polyline(leafletCoords, { color: 'blue' }).addTo(map);

  var along = turf.along(line, distance, { units: units });
  var coords = along.geometry.coordinates;

  L.marker([coords[1], coords[0]]).addTo(map)
      .bindPopup("Point " + distance + " " + units + " along the line");

  return along;
}

// ===== Member 3: Area =====
function createPolygonWithArea(coordinates) {
  var polygon = turf.polygon([coordinates]);
  var area = turf.area(polygon);
  var areaKm2 = (area / 1000000).toFixed(4);

  var leafletCoords = coordinates.map(function (c) { return [c[1], c[0]]; });
  L.polygon(leafletCoords, {
      color: 'green', fillColor: '#3f3', fillOpacity: 0.3
  }).addTo(map).bindPopup("Area: " + areaKm2 + " km²");

  document.getElementById('area-display').innerHTML =
      "Polygon Area: <b>" + areaKm2 + " km²</b>";

  return area;
}

// ===== Call all three =====
addMarkerWithBuffer(29.8884, -97.9384, 0.3, 'kilometers');

pointAlongLine([
  [-97.955, 29.875],
  [-97.940, 29.890],
  [-97.920, 29.900]
], 1, 'miles');

createPolygonWithArea([
  [-97.955, 29.895],
  [-97.935, 29.895],
  [-97.935, 29.905],
  [-97.955, 29.905],
  [-97.955, 29.895]
]);