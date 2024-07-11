async function run () {
  const map = L.map('map', {
    center: [47, 2],
    zoom: 6,
    zoomControl: false,
    fullscreenControl: true
  })
  /*
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  */
  const response = await fetch('http://127.0.0.1:8080/osm-bright.json')
  if (response.status !== 200) {
    throw new Error(`Impossible to fetch style ${style}: ` + response.status)
  }
  const style = await response.json()
  const backgroundLayer = style.layers.find(layer => layer.type === 'background')
  const backgroundColor = backgroundLayer.paint['fill-color']
  const rules = pmtiles.mapbox_style(style, {})
  const layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/planet-02-08-2023.pmtiles',
    ...rules,
    //debug: true,
    //levelDiff: 2,
    backgroundColor,
    maxDataZoom: 14,
    maxNativeZoom: 18
  })
  layer.addTo(map)
  map.on("click", (ev) => {
    const wrapped = map.wrapLatLng(ev.latlng)
    // note: this method supports only basic use, see comments in source code
    if (layer.queryTileFeaturesDebug) console.log(layer.queryTileFeaturesDebug(wrapped.lng, wrapped.lat))
  })
}

run()
