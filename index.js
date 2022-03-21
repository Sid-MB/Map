import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_API_TOKEN =
  'pk.eyJ1IjoiZm9vZmxlIiwiYSI6ImNsMHkwMWJmeTF0ZTczaXJwdXJmdGR0cWcifQ.HuJqUcujJniVQ1XEFDXluQ';

const locations = {
  school: [-122.233, 37.823],
  garden: [-122.469, 37.769],
};

// MARK:- THE MAP
var mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = MAPBOX_API_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-122.26, 37.8],
  zoom: 9,
});

// MARK:- Get Path using URL API
function getPathURLAPI() {
  const coordinateString = Object.values(locations)
    .map((pair) => pair.join(','))
    .join(';');
  const fetchURL = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinateString}?alternatives=false&geometries=polyline&overview=full&steps=false&access_token=${MAPBOX_API_TOKEN}`;
  console.log('Fetching:', fetchURL);
  async function request() {
    try {
      const response = await fetch(fetchURL); // https://docs.mapbox.com/api/navigation/directions/#example-requests-retrieve-directions

      const data = await response.json();

      const polyline = data.routes[0].geometry;
      console.log('Mapbox URL API', polyline);
    } catch (error) {
      console.error('Error retrieving directions', error);
    }
  }
  request();
}

getPathURLAPI();

// Light/Dark mode
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  map.setStyle('mapbox://styles/mapbox/dark-v10');
}
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    if (event.matches) {
      map.setStyle('mapbox://styles/mapbox/dark-v10');
    } else {
      map.setStyle('mapbox://styles/mapbox/light-v10');
    }
  });
