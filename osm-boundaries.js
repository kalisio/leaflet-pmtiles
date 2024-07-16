async function run () {
  const map = L.map('map', {
    center: [0, 6.8],
    zoom: 3,
    zoomControl: false,
    fullscreenControl: true
  })

  // function to adapt boundaries color regarding the admin_level
  function dynamicColor(z, f) {
    if (f.props.admin_level == document.getElementById("selectedLevel").value) return "yellow"
    else {
      if (f.props.adminLevel == 2) return "black"
      if (f.props.admin_level == 3) return "orange"
      if (f.props.admin_level == 4) return "rgba(255, 0, 0, 1)"
      if (f.props.admin_level == 5) return "purple"
      if (f.props.admin_level == 6) return "green"
      if (f.props.admin_level == 7) return "rgba(255, 196, 51, 153)"
      if (f.props.admin_level == 8) return "rgba(0, 0, 255, 1)"
      else return "black"
    }
  }

  // function to adapt toponyms font regarding the admin_level
  function dynamicFont(z,f) {
    if (f.props.admin_level == 2) return "100 24px " + document.getElementById("selectedFont").value
      else if (f.props.admin_level == 3) return "400 28px " + document.getElementById("selectedFont").value
      else if (f.props.admin_level == 4) return "900 32px " + document.getElementById("selectedFont").value
      return "400 12px " + document.getElementById("selectedFont").value
  }

  // function to adapt toponyms language
  function dynamicLanguage(z,f) {
    if (document.getElementById("selectedLanguage").value == "English") return ["name:en"]
      else if (document.getElementById("selectedLanguage").value == "French") return ["name:fr"]
      else if (document.getElementById("selectedLanguage").value == "Default value") return ["name"]
  }

  // define dynamic paint rules
  let paintRules = []
  for (let adminLevel = 2; adminLevel <= 8; adminLevel++){
    paintRules.push(
      {
        dataLayer: "level"+adminLevel,
        symbolizer: new protomapsL.LineSymbolizer({
          color: "black",
          width: 6,
          opacity: 1,
        })
      },
      {
        dataLayer: "level"+adminLevel,
        symbolizer: new protomapsL.LineSymbolizer({
          opacity: 1,
          width: 4,
          dashWidth: 2,
          color: dynamicColor,
          dashColor: dynamicColor,
          dash: [2, 4],
        })
      }
    )
  }

  // define dynamic label rules
  let labelRules = []
  for (let adminLevel = 2; adminLevel <= 8; adminLevel++){
    labelRules.push(
      {
        dataLayer: "level"+adminLevel+"toponyms",
        symbolizer: new protomapsL.CenteredTextSymbolizer({
          labelProps: dynamicLanguage,
          fill:"white",
          width: 2,
          stroke: dynamicColor,
          font: dynamicFont
        })
      }
    )
  }
  function onEachFeature(feature, layer) {
		let popupContent = `<p>I started out as a GeoJSON ${feature.geometry.type}, but now I'm a Leaflet vector!</p>`;

		if (feature.properties && feature.properties.name) {
			popupContent += feature.properties.name;
		}

		layer.bindPopup(popupContent);
	}

  // define layers
  let layer = protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/osm-boundaries-africa-234.pmtiles',
    paintRules,
    labelRules,
    tasks:[document.fonts.load("12px Work Sans")],
    }).addTo(map)

  let overlayLayer = protomapsL.leafletLayer({
      url: 'http://127.0.0.1:8081/osm-boundaries-10-07-2024.pmtiles',
      paintRules,
      labelRules,
      tasks:[document.fonts.load("12px Work Sans")],
     });

  // Create basemaps and overlaymaps object for layer switcher control
  const baseMaps = {
      "OSM-boundaries Africa": layer,
      "OSM-boundaries World": overlayLayer,
  }

  const overlayMaps = {
  };

  const layerControl = L.control.layers(overlayMaps, baseMaps, { collapsed: true }).addTo(map);
  
  // Attach a click event to the PMTiles layer to show the popup
  //map.on('click', function(z,f) {
   // console.log(f.props.admin_level)

      /*var popupContent = generatePopupContent(e.feature.properties);
      L.popup()
        .setLatLng(f.latlng)
        .setContent("non")
        .openOn(map)*/
 // })


  // function to refresh the page when target values are modified
  function update() {
    {
      layer.paintRules = paintRules
      layer.clearLayout()
      layer.rerenderTiles()
      
      overlayLayer.paintRules = paintRules
      overlayLayer.clearLayout()
      overlayLayer.rerenderTiles()  
    }
  }

  document.getElementById("selectedLevel").addEventListener('change', update)
  document.getElementById("selectedFont").addEventListener('change', update)
  document.getElementById("selectedLanguage").addEventListener('change', update)
}

run()