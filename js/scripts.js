/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
var map;
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [45,-120],
        zoom: 6

    
    });
    
    //add OSM base tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/k3nt-d/cloxh3eju009g01r63u685tpl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiazNudC1kIiwiYSI6ImNsb2l5cWcyazAwYXIycm1vY2R5MXNkZWwifQ.tO2BZUE-ZbahyZLzWq9gXg',
    {
        attribution: '&copy; <a href="https://api.mapbox.com/styles/v1/k3nt-d/cloxh3eju009g01r63u685tpl.html?title=view&access_token=pk.eyJ1IjoiazNudC1kIiwiYSI6ImNsb2l5cWcyazAwYXIycm1vY2R5MXNkZWwifQ.tO2BZUE-ZbahyZLzWq9gXg&zoomwheel=true&fresh=true#11.57/40.7771/-73.9697">Mapbox</a>', maxZoom: 17,
    }).addTo(map);

    //call getData function
    getData();
};


function pointToLayer(feature, latlng){
    //create marker options
    var options = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    //build popup content string
    var popupContent = "<p>" + property + ": " + feature.properties[property] + "</p>";

    //bind the popup to the circle marker
    layer.bindPopup(popupContent);

    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

//Add circle markers for point features to the map
function createSymbols(data, map){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: pointToLayer
    }).addTo(map);
};

function getData(){
    //load the data
    fetch("data/Power_Plants.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            createSymbols(json);
            
        });
};

document.addEventListener('DOMContentLoaded',createMap)

//codes from Chapter 4 Lesson 2 in Workbook