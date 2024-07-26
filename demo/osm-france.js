async function run () {
    // Define geojson features    
    const geojsonFeature = [
    { 
    "type": "Feature", 
    "style": { "color": "magenta", "opacity": 0.5, "stroke": { "color": "yellow", "width": 3 } },
    "properties": { "name": "Parc de la Colline" }, 
    "geometry": { "type": "Polygon", "coordinates": [ [ [ -72.357206347890767, 47.72858763003908 ], [ -71.86027854004486, 47.527648291638172 ], [ -72.37075892446839, 47.539848426151735 ], [ -72.357206347890767, 47.72858763003908 ] ] ] } 
    },
    { 
    "type": "Feature", 
    "properties": { "name": "Centre Paul-Étienne Simard", "fill": "orange", "stroke": "green", "stroke-width": 3 }, 
    "geometry": { "type": "Polygon", "coordinates": [ [ [ -72.357206347890767, 48.013440900213297 ], [ -72.239750684218109, 48.013440900213297 ], [ -72.253303260795718, 47.856056000888501 ], [ -72.027426984502114, 47.856056000888501 ], [ -72.036462035553868, 48.013440900213297 ], [ -71.905453795303586, 48.01646283861713 ], [ -71.891901218725963, 47.801464984333364 ], [ -72.361723873416651, 47.810567474765456 ], [ -72.357206347890767, 48.013440900213297 ] ] ] } 
    },
    { 
    "type": "Feature", 
    "properties": { "name": "Loisirs Rivière du Moulin" }, 
    "geometry": { "type": "Polygon", "coordinates": [ [ [ -72.194575428959382, 48.33278115872843 ], [ -72.018391933450374, 48.33278115872843 ], [ -71.846725963467236, 48.251628525276693 ], [ -71.950629050562299, 48.107038644740094 ], [ -72.203610480011122, 48.107038644740094 ], [ -72.397864077623623, 48.221539261269051 ], [ -72.194575428959382, 48.33278115872843 ] ] ] } 
    },
    { 
    "type": "Feature",
    "style": { "color": "blue", "opacity": 0.5, "width": 3, "dashArray": "0 8 0" },
    "properties": { "name": "Saint-Remy-en-Bouzemont-Saint-Genest-et-Isson" }, 
    "geometry": { "type": "LineString", "coordinates": [ [ -73.839785615317746, 47.564240180362376 ], [ -73.627461915601779, 47.716431476953346 ], [ -73.455795945618627, 47.552045722357249 ], [ -73.279612450109633, 47.710352336655504 ] ] } 
    },
    { 
    "type": "Feature",
    "properties": { "name": "Sainte-Geneviève", "stroke": "orange", "stroke-width": 6 }, 
    "geometry": { "type": "LineString", "coordinates": [ [ -73.716981531178234, 47.889388912080449 ], [ -73.423342371996569, 48.091953743979651 ], [ -73.242641350961676, 47.883329977544491 ], [ -73.685358852497131, 47.862118125007399 ] ] } 
    },
    { 
    "type": "Feature", 
    "properties": { "name": "Saint-Anicet" }, 
    "geometry": { "type": "LineString", "coordinates": [ [ -73.485142395986983, 48.338787334581873 ], [ -73.480624870461128, 48.161307640513321 ], [ -73.385756834417805, 48.164320903012829 ], [ -73.394791885469544, 48.338787334581873 ] ] } 
    },
    { 
    "type": "Feature", 
    "style": { "shape": "star", "size": [48, 45], "color": "orange", "stroke": { "color": "green", "width": 2 }, "text": { "label": "01" } },
    "properties": { "name": "Sydenham" }, 
    "geometry": { "type": "Point", "coordinates": [ -71.051641470913779, 47.610352336655504 ] } 
    },
    { "type": "Feature", 
    "style": { "shape": "circle", "color": "blue", "size": [32, 32], "stroke": { "color": "white", "width": 1 }, "icon": { "classes": "las la-home", "color": "white", "size": "20" } },
    "properties": { "name": "Saint-Luc" }, 
    "geometry": { "type": "Point", "coordinates": [ -71.110369302750115, 47.998430466372736 ] }
    },
    { 
    "type": "Feature", 
    "style": { "shape": "none", "color": "transparent", "size": [64, 64], "icon": { "url": "icons/kdk/position-cursor.png" } },
    "properties": { "name": "Loisirs du Fjord du Saguenay" }, 
    "geometry": { "type": "Point", "coordinates": [ -70.988396113551573, 48.32977780546792 ] }
    }]

    //  Setting maps
    let centerMap = [47.95, -72.45]

    const map1 = L.map('map1', {
      center: centerMap,
      zoom: 8,
      zoomControl: true,
      fullscreenControl: true
    })

    const map2 = L.map('map2', {
        center: centerMap,
        zoom: 8,
        zoomControl: true,
        fullscreenControl: true
      })

    // Define styles

    var pointStyle = 
    {
        radius: 12,
        fillColor: "purple",
        fillOpacity: 0.8,
        color: "orange",
        opacity: 1
    }

    var lineStyle = 
    {
        fill: false,/*
        color: 'green',
        weight: 4,
        opacity: 1,
        dashArray: [2,8],
        dashWidth: 2*/
    }

    var polygonStyle = 
    {
        "color": "purple",
        "fillColor": "yellow",
        "fillOpacity": 0.2,
        "opacity": 1,
        "weight": 2
    }

    var allStyles =
    {
        //radius: 12,
        fillColor: "purple",
        fillOpacity: 0.8,
        opacity: 1,
        color: 'green',
        weight: 4,
        opacity: 1,
        dashArray: [2,8],
        dashWidth: 2,
    }

    // Function to transforme leaflet style to protomaps style
    function transformFromLeafletStyle(leafletStyle, layer) {
        let paint_rules = []
        // Manage weight default value
        function ifWeight(leafletStyle) {
            if ( leafletStyle['stroke'] == false ) {
                return 0
            }
            if ( leafletStyle.hasOwnProperty('weight') ) {
                return leafletStyle["weight"]
            }
            else {
                return 3
            }
            }

        // Manage color default value
        function ifColor(leafletStyle) {
            if ( leafletStyle.hasOwnProperty('color') ) {
                return leafletStyle["color"]
            }
            else {
                return '#3388ff'	
            }}
        
        // Manage opacity default value
        function ifOpacity(leafletStyle) {
            if ( leafletStyle.hasOwnProperty('opacity') ) {
                return leafletStyle["opacity"]
            }
            else {
                return 1	
            }}
        
        // Manage fill default value
        function ifFill(leafletStyle) {
            if ( leafletStyle['fill'] == false ) {
                return 'transparent'
            }
            if ( leafletStyle.hasOwnProperty('fillColor') == true ) {
                return leafletStyle["fillColor"]
            }
            else {
                return ifColor(leafletStyle)
            }}

        // Manage fill opacity default value
        function ifFillOpacity(leafletStyle) {
            if ( leafletStyle.hasOwnProperty('fillOpacity') ) {
                return leafletStyle["fillOpacity"]
            }
            else {
                return 0.2	
            }}
        
        // Define paint rules for point features
        if ( leafletStyle.hasOwnProperty('radius') ) {
            paint_rules.push(
                {
                dataLayer: layer, 
                filter: (z,f) => f.geomType == 1,
                symbolizer: new protomapsL.CircleSymbolizer({
                    radius: leafletStyle['radius'],
                    fill: ifFill(leafletStyle),
                    opacity: ifOpacity(leafletStyle),
                    width: ifWeight(leafletStyle),
                    stroke: ifColor(leafletStyle),
                }),
                }
            )
        }
        
        // Define paint rules for line features   
        paint_rules.push(
            {
            dataLayer: layer,  
            symbolizer: new protomapsL.LineSymbolizer({
                width: ifWeight(leafletStyle),
                color: ifColor(leafletStyle),
                opacity: ifOpacity(leafletStyle),
                dash: leafletStyle['dashArray'],
                dashColor: ifColor(leafletStyle),
                dashWidth: ifWeight(leafletStyle),              
            }),
            }
        )

        // Define paint rules for polygon features
        paint_rules.push(
            {
            dataLayer: layer,    
            filter: (z,f) => f.geomType == 3,
            symbolizer: new protomapsL.PolygonSymbolizer({
                 //width: ifWeight(leafletStyle),
                //stroke: ifColor(leafletStyle),
                fill: ifFill(leafletStyle),
                opacity: ifFillOpacity(leafletStyle),
            }),
            }
        )

        return paint_rules;
    }
  
    // Create basemaps
    protomapsL.leafletLayer({
        url:'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=1003762824b9687f',
        theme:'light'
    }).addTo(map1)

    let paintRules = [] // Empty style for entry page
    var layer = protomapsL.leafletLayer({
        url:'http://127.0.0.1:8081/test.pmtiles',
        paintRules
    }).addTo(map1)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map2)

    // Function to synchronize views
    function syncMaps(map1, map2) {
        map1.on('move', function() {
            map2.setView(map1.getCenter(), map1.getZoom(), { animate : false});
        });

        map2.on('move', function() {
            map1.setView(map2.getCenter(), map2.getZoom(), { animate : false});
        });
    }

    // Syncing maps
    syncMaps(map1, map2);

    // Functions to manage feature geometry type  
    function selecStyleLeaflet(geom) {
        if (geom == "lineStyle") {
            return lineStyle
        }
        else if (geom == "polygonStyle") {
            return polygonStyle
        }
        else if ( geom == 'allStyles') {
            return allStyles
        }
        else return pointStyle
    }
    
    function selecGeomPMtiles(geom) {
        if (geom == "lineStyle") {
            return transformFromLeafletStyle(lineStyle, 'features')
        }
        else if (geom == "polygonStyle") {
            return transformFromLeafletStyle(polygonStyle, 'features')
        }
        else if (geom == "pointStyle") {
            return transformFromLeafletStyle(pointStyle, 'features')
        }
        else if ( geom == 'allStyles') {
            return transformFromLeafletStyle(allStyles, 'features')
        }
        else return []
    }

    // Function to refresh the page when target values are modified
    function update() {
    {
        // Refresh protomaps map
        layer.paintRules = selecGeomPMtiles(document.getElementById("selectedGeometry").value)
        layer.clearLayout()
        layer.rerenderTiles()

        // Refresh leaflet map
            // Supress layers
        map2.eachLayer(function (layer) {
            if (!!layer.toGeoJSON) {
                map2.removeLayer(layer);
            }
        });

            // Rerender tiles
        var selectedGeometry = document.getElementById("selectedGeometry").value;
        
        if ((selectedGeometry == 'none')) {
            stop
        }
        else if (selectedGeometry == 'pointStyle') {
            L.circleMarker([48.32977780546792, -70.988396113551573], pointStyle).addTo(map2);
        } 
        else {
            L.geoJSON(geojsonFeature, {
                style: selecStyleLeaflet(selectedGeometry)
            }).addTo(map2);
        }
    }
  }

  // Set listener event
  document.getElementById("selectedGeometry").addEventListener('change', update)


}
  
run()