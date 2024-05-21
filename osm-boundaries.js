async function run () {
  const map = L.map('map', {
    center: [47, 2],
    zoom: 6,
    zoomControl: false,
    fullscreenControl: true
  })

  let LABEL_RULES = [
    {
      dataLayer: "level4toponyms",
      symbolizer: new protomapsL.CenteredTextSymbolizer({
          label_props:["name"],
          fill:"white",
          width:dynamicWidth,
          stroke:dynamicColor,
      })
    },
    {
      dataLayer: "level6toponyms",
      symbolizer: new protomapsL.CenteredTextSymbolizer({
          label_props: ["name"],
          fill: "white",
          width: dynamicWidth,
          stroke: dynamicColor,
      })
    },
    {
      dataLayer: "level8toponyms",
      symbolizer: new protomapsL.CenteredTextSymbolizer({
          label_props: ["name"],
          fill: "white",
          width: dynamicWidth,
          stroke: dynamicColor,
      })
    }
  ]
  
  function dynamicColor(z, f) {
    if (f.props.admin_level == 2) return "orange"
    if (f.props.admin_level == 4) return "red"
    if (f.props.admin_level == 6) return "green"
    if (f.props.admin_level == 8) return "blue"
    else return "black"
  }

  function dynamicWidth(z, f) {
    if (f.props.admin_level <= 4) return 2
    else return 1
  }

  let PAINT_RULES = [
    {
      dataLayer: "level4",
      symbolizer: new protomapsL.LineSymbolizer({
        color: dynamicColor,
        width: dynamicWidth,
        opacity: 1,
      })
    },
    {
      dataLayer: "level6",
      symbolizer: new protomapsL.LineSymbolizer({
        color: dynamicColor,
        width: dynamicWidth,
        opacity: 1,
      })
    },
    {
      dataLayer: "level8",
      symbolizer: new protomapsL.LineSymbolizer({
        color: dynamicColor,
        width: dynamicWidth,
        opacity: 1,
      })
    }
  ]

  protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/osm-boundaries-09-03-2024.pmtiles',
    paintRules: PAINT_RULES,
    labelRules: LABEL_RULES
  }).addTo(map)
  }

run()
