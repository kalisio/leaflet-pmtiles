async function run () {
  const map = L.map('map', {
    center: [0, 6.8],
    zoom: 3,
    zoomControl: false,
    fullscreenControl: true
  })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

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
    labelRules.push({
      dataLayer: "level"+adminLevel+"toponyms",
      symbolizer: new protomapsL.CenteredTextSymbolizer({
        labelProps: dynamicLanguage,
        fill:"white",
        width: 2,
        stroke: dynamicColor,
        font: dynamicFont
      })
    })
  }
  
  // define layers
  let layer = protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/osm-boundaries.pmtiles',
    paintRules,
    labelRules,
    tasks:[document.fonts.load("12px Work Sans")],
    }).addTo(map)

  // function to refresh the page when target values are modified
  function update() {
    layer.paintRules = paintRules
    layer.clearLayout()
    layer.rerenderTiles()
  }

  document.getElementById("selectedLevel").addEventListener('change', update)
  document.getElementById("selectedFont").addEventListener('change', update)
  document.getElementById("selectedLanguage").addEventListener('change', update)
}

run()