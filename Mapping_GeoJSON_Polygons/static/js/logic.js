// Add console.log to check to see if our code is working.
console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Steets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.30],
  zoom: 11,
  layers: [streets]
})

// Create a style for the lines.
let darkStyle = {
  fillColor: "#ffff00",
  color: "#0000ff",
  weight: 1
}

let lightStyle = {
  color: 'blue',
  weight: 2,
}

let myStyle = {
  Dark: darkStyle,
  Light: lightStyle,
}

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Add GeoJSON data.
let torontoHoods ='https://raw.githubusercontent.com/StephenDini/Mapping_Earthquakes/main/torontoNeighborhoods.json'

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(data => {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    style: darkStyle,
    onEachFeature: (feature, layer) => {
        layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "<hr>");
        }

  }).addTo(map);;
});

