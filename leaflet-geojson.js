async function run () {
  const response = await fetch('http://127.0.0.1:8080/features.geojson')
  if (response.status !== 200) {
    throw new Error(`Impossible to fetch geojson: ` + response.status)
  }
  const geojson = await response.json()

  // Map settings
  const settings = {
    center: [47.95, -72.45],
    zoom: 8,
    zoomControl: true,
    fullscreenControl: true
  }
  const map1 = L.map('map1', settings)
  const map2 = L.map('map2', settings)

  // Define styles
  const Styles = {
    Point: {
      radius: 12,
      fillColor: 'purple',
      fillOpacity: 0.8,
      color: 'orange',
      opacity: 1
    },
    LineString: {
      fill: false,
      color: 'green',
      weight: 4,
      opacity: 1,
      dashArray: [2,8],
      dashWidth: 2
    },
    Polygon: {
      color: 'purple',
      fillColor: 'yellow',
      fillOpacity: 0.2,
      opacity: 1,
      weight: 2
    },
    Any: {
      radius: 12,
      fillColor: 'purple',
      fillOpacity: 0.8,
      opacity: 1,
      color: 'green',
      weight: 4,
      opacity: 1,
      dashArray: [2,8],
      dashWidth: 2
    }
  }

  // Create basemaps
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map1)
  const layer = protomapsL.leafletLayer({
    url:'http://127.0.0.1:8080/features.pmtiles',
    paintRules: [] // Empty style on start
  }).addTo(map1)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map2)

  // Syncing maps
  map1.on('move', function() {
    map2.setView(map1.getCenter(), map1.getZoom(), { animate : false})
  })
  map2.on('move', function() {
    map1.setView(map2.getCenter(), map2.getZoom(), { animate : false})
  })

  // Function to refresh the page when target values are modified
  function update() {
    const selectedGeometry = document.getElementById('selectedGeometry').value
    // Style and filter according to displayed geometry type
    layer.paintRules = (selectedGeometry !== 'None' ? pmtiles.leaflet_style(Styles[selectedGeometry], 'features').paintRules : [])
    layer.paintRules = layer.paintRules.map(rule => {
      const originalFilter = rule.filter
      return Object.assign({}, rule, { filter: (z,f) => (selectedGeometry !== 'Any' ? selectedGeometry === pmtiles.getGeometryType(f) : originalFilter ? originalFilter(z,f) : true) })
    })

    // Refresh leaflet map
    layer.clearLayout()
    layer.rerenderTiles()
    map2.eachLayer(function (layer) {
      if (!!layer.toGeoJSON) {
        map2.removeLayer(layer)
      }
    })
    if (selectedGeometry !== 'None') {
      L.geoJSON(geojson, {
        // Style and filter according to displayed geometry type
        style: Styles[selectedGeometry],
        filter: (feature) => (selectedGeometry !== 'Any' ? selectedGeometry === feature.geometry.type : true)
      }).addTo(map2)
    }
  }

  // Set listener event
  document.getElementById('selectedGeometry').addEventListener('change', update)
}
  
run()