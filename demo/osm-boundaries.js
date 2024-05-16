async function run () {
  const map = L.map('map', {
    center: [47, 2],
    zoom: 6,
    zoomControl: false,
    fullscreenControl: true
  })
  
  /* L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  */
  class MyBorderSymbolizer {
    draw(context,geom,z,feature) {
        context.fillStyle = "transparent"
        context.beginPath()
        for (var poly of geom) {
            for (var p = 0; p < poly.length-1; p++) {
                let pt = poly[p]
                if (p == 0) context.moveTo(pt.x,pt.y)
                else context.lineTo(pt.x,pt.y)
            }
        }
        context.fill()
    }
  }

  // k-rclone kalisio copy ovh:kargo/data/MBTIles/osm-boundaries-05-01-2024.mbtiles ~/Projets/leaflet-pmtiles/ --progress
  class MyPlaceSymbolizer {
    place(layout,geom,feature) {
        let pt = geom[0][0]
        let name = feature.props.name

        var font = "12px sans-serif"
        if (feature.props.admin_level == "4") font = "500 14px sans-serif"
        if (feature.props.admin_level == "6") font = "800 16px sans-serif"

        layout.scratch.font = font
        let metrics = layout.scratch.measureText(name)
        let width = metrics.width
        let ascent = metrics.actualBoundingBoxAscent
        let descent = metrics.actualBoundingBoxDescent
        let bbox = {minX:pt.x-width/2,minY:pt.y-ascent,maxX:pt.x+width/2,maxY:pt.y+descent}

        let draw = ctx => {
            ctx.font = font
            ctx.fillStyle = "darkslategray"
            ctx.fillText(name,-width/2,0)
        }
        return [{anchor:pt,bboxes:[bbox],draw:draw}]
    }
  }
  
  let LABEL_RULES = [
    /*{
      dataLayer: "level4",
      symbolizer: new MyPlaceSymbolizer()
    },*/
  ]

  let PAINT_RULES = [
    {
      dataLayer: "level8",
      symbolizer: new protomapsL.LineSymbolizer({
        color: "blue",
        width: 1,
        opacity: 1
      })
    },
    {
      dataLayer: "level6",
      symbolizer: new protomapsL.LineSymbolizer({
        color: "green",
        width: 1,
        dashArray: ["6","6"]
      })
    },
    {
      dataLayer: "level4",
      symbolizer: new protomapsL.LineSymbolizer({
        color: "red",
        width: 2,
      })
    },
  ]
  protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/osm-boundaries.pmtiles',
    paintRules:PAINT_RULES,
    labelRules:LABEL_RULES
  }).addTo(map)
  
  /*const response = await fetch('http://127.0.0.1:8080/osm-bright.json')
  if (response.status !== 200) {
    throw new Error(`Impossible to fetch style ${style}: ` + response.status)
  }
  const style = await response.json()
  const backgroundLayer = style.layers.find(layer => layer.type === 'background')
  const backgroundColor = backgroundLayer.paint['fill-color']
  const rules = pmtiles.mapbox_style(style, {})
  const layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/france.pmtiles',
    paintRules:PAINT_RULES,
    labelRules:LABEL_RULES,
    //debug: true,
    //levelDiff: 2,
    backgroundColor
  })
  layer.addTo(map)
  map.on("click", (ev) => {
    const wrapped = map.wrapLatLng(ev.latlng)
    // note: this method supports only basic use, see comments in source code
    if (layer.queryTileFeaturesDebug) console.log(layer.queryTileFeaturesDebug(wrapped.lng, wrapped.lat))
  })*/
}

run()
