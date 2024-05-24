async function run () {
  const map = L.map('map', {
    center: [42.725385312747186, 1.833743432010808],
    zoom: 10,
    zoomControl: false,
    fullscreenControl: true
  })

  function dynamicColor(z, f) {
    if (document.getElementById("selectedAltitude").value != "" && f.props.height >= document.getElementById("selectedAltitude").value) return "red"
    else return "black"
  }

  let paintRules = [
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineSymbolizer({
        color: dynamicColor,
        width: 1.1,
        opacity: 0.4,
      }),
      filter: (z,f) => { return f.props.height > 0 && f.props.nth_line in [5, 10] == true }
    },
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineSymbolizer({
        color: dynamicColor,
        width: 0.6,
        opacity: 0.3,        
      }),
      filter: (z,f) => { return f.props.height > 0 && f.props.nth_line in [5, 10] == false}
    },
    ]

  let labelRules = [
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineLabelSymbolizer({
          labelProps:["height"],
        }),
      filter: (z,f) => { return f.props.nth_line in [5, 10] == true}
    }
  ]

  console.log(labelRules)

  let layer = protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/contourlines-france.pmtiles',
    paintRules,
    labelRules,
  }).addTo(map)

  document.getElementById("selectedAltitude").addEventListener('keyup', function(e){
    if(e.key == 'Enter')
    layer.redraw();
  })
}

run()