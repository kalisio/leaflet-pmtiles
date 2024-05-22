async function run () {
  const map = L.map('map', {
    center: [47, 2],
    zoom: 6,
    zoomControl: false,
    fullscreenControl: true
  })

  var selectedLevel = 0
  function dynamicColor(z, f) {
    if (f.props.admin_level == selectedLevel) return "yellow"
     else {
      if (f.props.admin_level == 2) return "black"
      if (f.props.admin_level == 3) return "orange"
      if (f.props.admin_level == 4) return "rgba(255, 0, 0, 1)"
      if (f.props.admin_level == 5) return "purple"
      if (f.props.admin_level == 6) return "green"
      if (f.props.admin_level == 7) return "rgba(255, 196, 51, 153)"
      if (f.props.admin_level == 8) return "rgba(0, 0, 255, 1)"
      else return "black" }
  }

  function dynamicWidth(z, f) {
    if (f.props.admin_level < 4) return 3
    if (f.props.admin_level >=4 && f.props.admin_level <6) return 2
    else return 1
  }

  let paintRules = []
  for (let adminLevel = 2; adminLevel <= 8; adminLevel++){
    paintRules.push(
      {
        dataLayer: "level"+adminLevel,
        symbolizer: new protomapsL.LineSymbolizer({
          color: dynamicColor,
          width: dynamicWidth,
          opacity: 1,
          // dash: [2, 4],
          //dashColor: dynamicColor
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
  console.log(labelRules)

  protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/osm-boundaries-africa.pmtiles',
    paintRules,
    labelRules
  }).addTo(map)
  }

run()
