var map = L.map('map').setView([29.8884, -97.9384], 14); //sets the leaflet map and made it center on san marcos

var mapLink =
    '<a href="https://www.openstreetmap.org">OpenStreetMap</a>';

L.tileLayer
(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18
    }
)
.addTo(map);

var point = turf.point([-97.941764, 29.888539]);  // create a geojson point using Turf
var polygon = turf.polygon([        // create a geojson polygon using turf
  [
    [-98.00, 29.82],
    [-97.85, 29.82],
    [-97.85, 29.94],
    [-98.00, 29.94],
    [-98.00, 29.82],
  ],
]);

var area = turf.area(polygon);
console.log(area);
//------------------------------------------------------------------------------------------------------------------------

// so what was missing is the ".addTo(Map)" syntax which help to add your layer to the basemap so it could appear on the screen.
// while L.geoJSON(point) creates a leaflet layer from the turf point


L.geoJSON(point).addTo(map); // display the turf point on leaflet 

var polygonLayer = L.geoJSON(polygon).addTo(map);  //Display the turf polygon and stoe its leaflet layer
map.fitBounds(polygonLayer.getBounds());  //adjust the maps