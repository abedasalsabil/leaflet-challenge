const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Fetch the JSON data 
// d3.json(url).then(function(data) {
//     createFeatures(data.features);
//   });

  // Create a map object.
var myMap = L.map("map", {
    center: [-123.5456696, 39.920166],
    zoom: 5,
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
  }).addTo(myMap);

// Fetch the data from the URL
fetch(url).then((response) =>response.json()).then((data) => {

    data.features.forEach((feature) => {
        //create size of marker based on magnitude
        var markerSize = feature.properties.mag * 5;
        
        //create a 'depth' variable
        var depth = feature.geometry.coordinates[2];

        //create a color scheme of markers based on depth 
        var firstColor = "green";
        var secondColor = "#89FF49";
        var thirdColor = "yellow";
        var fourthColor = "orange";
        var fifthColor = "#FF8349";
        var deepColor = "red";

        // Create a marker and add it on the map
        var marker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: markerSize,
            fillColor: depth < 10 ? firstColor : depth < 30 ? secondColor : depth < 50 ? thirdColor 
            : depth < 70 ? fourthColor
            : depth < 90 ? fifthColor : deepColor,
            color: depth < 10 ? firstColor : depth < 30 ? secondColor : depth < 50 ? thirdColor 
            : depth < 70 ? fourthColor
            : depth < 90 ? fifthColor : deepColor,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        }).addTo(myMap);

        // Add a popup message to the marker
        marker.bindPopup("<b>Where: " + feature.properties.place + "</b><br>Magnitude: " + feature.properties.mag);
        });
    });

// create a legend to provide context of the markers
var legendColors = ["green", "#89FF49", "yellow", "orange", "#FF8349", "red"];
var legendLabels = [-10, 10, 30, 50, 70, 90];

// create a 'legend' variable 
var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var legendInfo = "<h4>Depth</h4>";
    div.innerHTML = legendInfo; // add title element

    for (var i = 0; i < legendColors.length; i++) {
        div.innerHTML += "<i style='background-color: "
          + legendColors[i]
          + "'></i> "
          + legendLabels[i]
          + (legendLabels[i + 1] ? "&ndash;" + legendLabels[i + 1] + "<br>" : "+");
      } 
    return div;
};

legend.addTo(myMap);




