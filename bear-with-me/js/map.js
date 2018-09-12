L.mapbox.accessToken = 'pk.eyJ1Ijoic2Via25pZ2h0IiwiYSI6ImNqaTNuNDFodTAwYjQzcHIxNXB5YWFxNDEifQ.wpTWbTXyg2OGtiM9G1UvrA';
var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: false
}).setView([-41.13, 174.67], 6);

var styleLayer = L.mapbox.styleLayer('mapbox://styles/sebknight/cjintebre1ihi2rnpwvmoa7y7')
.addTo(map);

// move the attribution control out of the way
// map.attributionControl.setPosition('bottomleft');

// create the initial directions object, from which the layer
// and inputs will pull data.
// var directions = L.mapbox.directions();
//
// var directionsLayer = L.mapbox.directions.layer(directions)
//     .addTo(map);
//
// var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
//     .addTo(map);
//
// var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
//     .addTo(map);
//
// var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
//     .addTo(map);
//
// var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
//     .addTo(map);
