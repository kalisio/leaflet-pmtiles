async function run () {
  // define map center 
  let palikir_center = [6.87684, 158.23265]
  let france_center = [42.725385312747186, 1.833743432010808]
  let persian_center = [7.51, 38.55]
  // define map
  const map = L.map('map', {
    center: persian_center,
    zoom: 10,
    zoomControl: false,
    fullscreenControl: true
  })
  
  // define function for a dynamic color rendering according entered altitude
  function dynamicColor(z, f) {
    if (document.getElementById("minimumAltitude").value != "" && 
      document.getElementById("maximumAltitude").value != "" && 
      f.props.height >= document.getElementById("minimumAltitude").value && 
      f.props.height <= document.getElementById("maximumAltitude").value) return "red"
    if (document.getElementById("minimumAltitude").value != "" && 
      document.getElementById("maximumAltitude").value == "" && 
      f.props.height >= document.getElementById("minimumAltitude").value) return "red"
    if (document.getElementById("minimumAltitude").value == "" && 
      document.getElementById("maximumAltitude").value != "" && 
      f.props.height <= document.getElementById("maximumAltitude").value) return "red"
    else return "black"
  }

  // Define style rules for contourlines
  let paintRulesAirbus = [
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineSymbolizer({
        color: 'black',
        width: 1.1,
        opacity: 0.4,
      }),
      filter: (z,f) => { return f.props.height <= document.getElementById("minimumAltitude").value 
          || f.props.height >= document.getElementById("maximumAltitude").value }
    },
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineSymbolizer({
        color: 'red',
        width: 0.6,
        opacity: 0.3,
      }),
      filter: (z,f) => { return f.props.height > document.getElementById("minimumAltitude").value 
        & f.props.height < document.getElementById("maximumAltitude").value }
    },
  ]

  let paintRules = []
  for (let interval of [10, 20, 50, 100, 200, 500]){
    paintRules.push(
      {
        dataLayer: "contour"+interval,
        symbolizer: new protomapsL.LineSymbolizer({
          color: 'black',
          width: 1.1,
          opacity: 0.4,
        }),
        filter: (z,f) => { return f.props.elev <= document.getElementById("minimumAltitude").value 
            || f.props.elev >= document.getElementById("maximumAltitude").value }
      },
      {
        dataLayer: "contour"+interval,
        symbolizer: new protomapsL.LineSymbolizer({
          color: 'red',
          width: 0.6,
          opacity: 0.3,
        }),
        filter: (z,f) => { return f.props.elev > document.getElementById("minimumAltitude").value 
            & f.props.elev < document.getElementById("maximumAltitude").value }
      },
      {
        dataLayer: "contour"+interval,
        symbolizer: new protomapsL.PolygonSymbolizer({
          fill: 'transparent',
          width: 1.1,
          opacity: 0.3,
        }),
        filter: (z,f) => { return f.props.altimax <= document.getElementById("minimumAltitude").value
              || f.props.altimin >= document.getElementById("maximumAltitude").value}
      },
      {
        dataLayer: "contour"+interval,
        symbolizer: new protomapsL.PolygonSymbolizer({
          fill: 'red',
          width: 1.1,
          opacity: 0.3,
        }),
        filter: (z,f) => { return f.props.altimin >= document.getElementById("minimumAltitude").value
            & f.props.altimin <= document.getElementById("maximumAltitude").value }
      }
    )}

    console.log(paintRules)


  // Define style rules for labels
  let labelRules = []
  for (let interval of [10, 20, 50, 100, 200, 500]){
    labelRules.push(
      {
        dataLayer: "contour"+interval,
        symbolizer: new protomapsL.LineLabelSymbolizer({
          labelProps: ["elev"],
          fill: "black",
          font: "400 12px sans-serif",
          width: 2,
          stroke: "white",
        })
      })
      //filter: (z,f) => { return f.props.nth_line in [5, 10] == true}
    
  }

  console.log(labelRules)


  // Display the layer by curling the pmtiles file and fitting it with the stylesheet
  let gmted_line_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/gmted-line-merged.pmtiles',        
    paintRules,
    labelRules
  }).addTo(map);

  let gmted_poly_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/gmted-polygon-merged.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);
  
  let gmted_poly_vrt_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/gmted-polygon-merged-vrt.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);
  gmted_poly_vrt_layer

  let gmted_poly_vrt_nodrop_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/gmted-polygon-merged-vrt-nodrop.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);

  let gmted_poly_vrt_nosimp_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/gmted-polygon-merged-vrt-nosimp.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);

  let dem_poly_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/dem-polygon-merged.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);
  
  let dem_poly_nosimp_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/dem-polygon-merged-nosimp.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);

  let dem_poly_nodrop_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/dem-polygon-merged-nodrop.pmtiles',      
    paintRules,
    labelRules
  }).addTo(map);
  
  let srtm_line_layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/srtm-line-merged.pmtiles',        
    paintRules,
    labelRules
  }).addTo(map);

  // Define actual hillshading layer
  let airbus_contourlines = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/contourlines-cropped.pmtiles',
    paintRules: paintRulesAirbus,
    labelRules,
    tasks:[document.fonts.load("12px Work Sans")],
   }).addTo(map);

// Create basemaps and overlaymaps object for layer switcher control
const baseMaps = {
}

const overlayMaps = {
  "GMTED contour lines": gmted_line_layer,
  "GMTED contour polygons": gmted_poly_layer,
  "GMTED contour polygons VRT": gmted_poly_vrt_layer,
  "GMTED contour polygons VRT without dropping": gmted_poly_vrt_nodrop_layer,
  "GMTED contour polygons VRT without line simplification": gmted_poly_vrt_nosimp_layer,
  "DEM contour polygons": dem_poly_layer,
  "DEM contour polygons without dropping": dem_poly_nodrop_layer,
  "DEM contour polygons without line simplification": dem_poly_nosimp_layer,
  "SRTM contour lines": srtm_line_layer,
  "Actual contourlines": airbus_contourlines,
};

// Add layer switcher control
const layerControl = L.control.layers(overlayMaps, baseMaps, { collapsed: true }).addTo(map);

// Function to refresh the page when target values are modified
function update() {
  {
      // Refresh protomaps map
      gmted_line_layer.paintRules = paintRules
      gmted_line_layer.clearLayout()
      gmted_line_layer.rerenderTiles()

      gmted_poly_layer.paintRules = paintRules
      gmted_poly_layer.clearLayout()
      gmted_poly_layer.rerenderTiles()

      gmted_poly_vrt_layer.paintRules = paintRules
      gmted_poly_vrt_layer.clearLayout()
      gmted_poly_vrt_layer.rerenderTiles()

      gmted_poly_vrt_nodrop_layer.paintRules = paintRules
      gmted_poly_vrt_nodrop_layer.clearLayout()
      gmted_poly_vrt_nodrop_layer.rerenderTiles()

      gmted_poly_vrt_nosimp_layer.paintRules = paintRules
      gmted_poly_vrt_nosimp_layer.clearLayout()
      gmted_poly_vrt_nosimp_layer.rerenderTiles()   

      dem_poly_layer.paintRules = paintRules
      dem_poly_layer.clearLayout()
      dem_poly_layer.rerenderTiles()

      dem_poly_nodrop_layer.paintRules = paintRules
      dem_poly_nodrop_layer.clearLayout()
      dem_poly_nodrop_layer.rerenderTiles()
      
      dem_poly_nosimp_layer.paintRules = paintRules
      dem_poly_nosimp_layer.clearLayout()
      dem_poly_nosimp_layer.rerenderTiles()

      srtm_line_layer.paintRules = paintRules
      srtm_line_layer.clearLayout()
      srtm_line_layer.rerenderTiles()      

      airbus_contourlines.paintRules = paintRulesAirbus
      airbus_contourlines.clearLayout()
      airbus_contourlines.rerenderTiles()
  }
}

// Set listener event
document.getElementById("minimumAltitude").addEventListener('change', update)
document.getElementById("maximumAltitude").addEventListener('change', update)
}

run()