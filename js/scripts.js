/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
var map;
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [20, 0],
        zoom: 17
    });

    //add OSM base tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/k3nt-d/cloxh3eju009g01r63u685tpl.html?title=copy&access_token=pk.eyJ1IjoiazNudC1kIiwiYSI6ImNsb2l5cWcyazAwYXIycm1vY2R5MXNkZWwifQ.tO2BZUE-ZbahyZLzWq9gXg&zoomwheel=true&fresh=true#11.57/40.7771/-73.9697/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiazNudC1kIiwiYSI6ImNsb2l5cWcyazAwYXIycm1vY2R5MXNkZWwifQ.tO2BZUE-ZbahyZLzWq9gXg'
    ).addTo(map);

    //call getData function
    getData();
};

function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

//function to retrieve the data and place it on the map
function getData(){
    //load the data
    fetch("data/Power_Plants.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            L.geoJson(json, {
                onEachFeature: onEachFeature
            }).addTo(map);            
            //create marker options
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }
            }).addTo(map);
        });
};

document.addEventListener('DOMContentLoaded',createMap)

//codes from Chapter 4 Lesson 2 in Workbook