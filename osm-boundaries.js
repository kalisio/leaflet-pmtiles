async function run () {
  const map = L.map('map', {
    center: [0, 6.8],
    zoom: 3,
    zoomControl: false,
    fullscreenControl: true
  })

  function dynamicColor(z, f) {
    if (f.props.admin_level == document.getElementById("selectedLevel").value) return "yellow"
    else {
      if (f.props.admin_level == 2) return "black"
      if (f.props.admin_level == 3) return "orange"
      if (f.props.admin_level == 4) return "rgba(255, 0, 0, 1)"
      if (f.props.admin_level == 5) return "purple"
      if (f.props.admin_level == 6) return "green"
      if (f.props.admin_level == 7) return "rgba(255, 196, 51, 153)"
      if (f.props.admin_level == 8) return "rgba(0, 0, 255, 1)"
      else return "black"
    }
  }
  
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

  let labelRules = []
  for (let adminLevel = 2; adminLevel <= 8; adminLevel++){
    labelRules.push(
      {
        dataLayer: "level"+adminLevel+"toponyms",
        symbolizer: new protomapsL.CenteredTextSymbolizer({
          labelProps:["name:en"],
          fill:"white",
          width: 2,
          stroke: dynamicColor
        })
      }
    )
  }

  let layer = protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/osm-boundaries.pmtiles',
    paintRules,
    labelRules,
  }).addTo(map)


  document.getElementById("selectedLevel").addEventListener("click", function(){ layer.redraw()})
  }

run()