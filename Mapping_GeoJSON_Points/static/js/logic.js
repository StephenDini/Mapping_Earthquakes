// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data.
let airportData ='https://raw.githubusercontent.com/StephenDini/Mapping_Earthquakes/main/majorAirports.json'

// Grabbing our GeoJSON data.
d3.json(airportData).then(data => {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    onEachFeature: function(feature, layer){
    layer.bindPopup("<h2>"+ "Airport Code: " + feature.properties.faa + "</h2></br><h3>" 
  + "Airport Name: " + feature.properties.name )
    }
  }).addTo(map);
});