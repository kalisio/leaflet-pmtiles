async function run () {
  const map = L.map('map', {
    center: [47, 2],
    zoom: 6,
    zoomControl: false,
    fullscreenControl: true
  })
  const fontsubmap = {
    'Inter': { face: 'Inter' },
    'Raleway': { face: 'Raleway' },
    'Work Sans': { face: 'Work Sans' },
    'Petrona': { face: 'Petrona' },
    'Manrope': { face: 'Manrope' }
  }
  /*
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  */
  const response = await fetch('http://127.0.0.1:8080/osm-bright.json')
  if (response.status !== 200) {
    throw new Error(`Impossible to fetch style: ` + response.status)
  }
  const style = await response.json()
  const backgroundLayer = style.layers.find(layer => layer.type === 'background')
  const backgroundColor = backgroundLayer.paint['fill-color']
  // Reflect default language/font value into style
  updateStyleFont()
  updateStyleLanguage()
  const rules = pmtiles.mapbox_style(style, fontsubmap)
  const layer = protomapsL.leafletLayer({
    url: 'http://127.0.0.1:8081/planet-02-08-2023.pmtiles',
    ...rules,
    tasks:[document.fonts.load('12px Work Sans'),document.fonts.load('12px Manrope'),document.fonts.load('12px Inter'),document.fonts.load('12px Petrona'),document.fonts.load('12px Raleway')],
    //debug: true,
    //levelDiff: 2,
    backgroundColor,
    maxDataZoom: 14,
    maxNativeZoom: 18
  }).addTo(map)
  
  function updateStyleFont() {
    style.layers.forEach(layer => {
      if (layer.layout && layer.layout['text-font']) {
        layer.layout['text-font'] = [document.getElementById('selectedFont').value]
      }
    })
  }
  function updateStyleLanguage() {
    // Default value is Latin
    let field = 'name:latin'
    if (document.getElementById('selectedLanguage').value == 'English') field = 'name:en'
    else if (document.getElementById('selectedLanguage').value == 'French') field = 'name:fr'

    style.layers.forEach(layer => {
      if (layer.layout && layer.layout['text-field']) {
        layer.layout['text-field'] = field
      }
    })
  }
  function updateStyle() {
    const rules = pmtiles.mapbox_style(style, fontsubmap)
    Object.assign(layer, rules)
    layer.clearLayout()
    layer.rerenderTiles()
  }
  function updateFont() {
    updateStyleFont()
    updateStyle()
  }
  function updateLanguage() {
    updateStyleLanguage()
    updateStyle()
  }

  document.getElementById('selectedFont').addEventListener('change', updateFont)
  document.getElementById('selectedLanguage').addEventListener('change', updateLanguage)
}

run()
