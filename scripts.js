 //warstwa podglądowa
 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap'
});


var geoportal = L.tileLayer.wms('https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/HighResolution', {
    layers: 'Raster',
    format: 'image/png',
    transparent: true
});

var mapOptions = {
    center: [54.35588583508963, 18.648828418766378],
    zoom: 13,
    layers: [osm]
    }

var map = new L.map('map', mapOptions);


//ikony
var fontanna = L.marker([54.348542964212974, 18.653242702424325]).bindPopup("Fontanna Neptuna.").openPopup(),
    most    = L.marker([54.35365083903367, 18.660471255514523]).bindPopup("Kładka zwodzona na Ołowiankę").openPopup(),
    gora    = L.marker([54.357859402986186, 18.640217190131484]).bindPopup("Góra Gradowa").openPopup(),
    muzeum   = L.marker([54.35605377698324, 18.660024777021633]).bindPopup("Muzem II Wojny Światowej").openPopup(),
    church   = L.marker([54.34991366652922, 18.653367534265776]).bindPopup("Bazylika Mariacka Wniebowzięcia Najświętszej Maryi Panny w Gdańsku").openPopup(),
    gate   = L.marker([54.3496885534003, 18.648066148059023]).bindPopup("Złota Brama").openPopup();


var attraction = L.layerGroup([fontanna,most,gora,muzeum,church,gate]);

//wektor geojason



function onEachFeature(feature, layer) {
  if (feature.properties){
      var dane = `Informacje o obiekcie: <br>
      LOKALNY_ID: ${feature.properties.LOKALNYID} <br>
      ZB_WODY: ${feature.properties.ZB_NAZWA} <br>
      RODZAJ: ${feature.properties.RODZAJ}`;
      layer.bindPopup(dane);
    }
};


var water = L.geoJSON(PTWP_A, {
    onEachFeature: onEachFeature
}).addTo(map);

//warstwy
var layers = {
    "<span style ='color: blue'>Ortofotomapa</span>": geoportal,
    "<span style='color: green'>OpenStreetMap</span>": osm

};

var overlay = {
    "<i>Atrakcje turystyczne</i>": attraction,
    "<b>Wody powierzchniowe</b>": water
};


//skala
L.control.scale({
    maxwidth: 500,
    metric: true,
    imperial: false,
    position: 'bottomleft'
}).addTo(map);


var layerControl = L.control.layers(layers,overlay).addTo(map);