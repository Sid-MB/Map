import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// MARK:- THE MAP
var mapboxgl = require('mapbox-gl');
var MapboxDirections = require('@mapbox/mapbox-gl-directions');

mapboxgl.accessToken =
  'pk.eyJ1IjoiZm9vZmxlIiwiYSI6ImNsMHkwMWJmeTF0ZTczaXJwdXJmdGR0cWcifQ.HuJqUcujJniVQ1XEFDXluQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-122.26, 37.8],
  zoom: 9,
});

const directions = new MapboxDirections({
  accessToken:
    'pk.eyJ1IjoiZm9vZmxlIiwiYSI6ImNsMHkwMWJmeTF0ZTczaXJwdXJmdGR0cWcifQ.HuJqUcujJniVQ1XEFDXluQ',
  profile: 'mapbox/driving',
  interactive: false,
  controls: {
    inputs: false,
    instructions: false,
    profileSwitcher: false,
  },
});

directions.on('route', (result) => {
  const polyline = result.route[0].geometry;
  console.log(polyline);
});

const locations = {
  school: [-122.233, 37.823],
  garden: [-122.469, 37.769],
};
map.on('load', () => {
  //map.addControl(directions);

  directions.setOrigin(locations.school); // can be address in form setOrigin("12, Elm Street, NY")
  directions.setDestination(locations.garden); // can be address
});

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
