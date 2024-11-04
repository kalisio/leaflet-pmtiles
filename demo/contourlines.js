async function run () {
  
  // define map
  const map = L.map('map', {
    center: [42.725385312747186, 1.833743432010808],
    zoom: 10,
    zoomControl: false,
    fullscreenControl: true
  })
  
  // define function for a dynamic color rendering according entered altitude
  function dynamicColor(z, f) {
    if (document.getElementById("minimumAltitude").value != "" && 
      document.getElementById("maximumAltitude").value != "" && 
      f.props.height >= document.getElementById("minimumAltitude").value && 
      f.props.height <= document.getElementById("maximumAltitude").value) return "red"
    if (document.getElementById("minimumAltitude").value != "" && 
      document.getElementById("maximumAltitude").value == "" && 
      f.props.height >= document.getElementById("minimumAltitude").value) return "red"
    if (document.getElementById("minimumAltitude").value == "" && 
      document.getElementById("maximumAltitude").value != "" && 
      f.props.height <= document.getElementById("maximumAltitude").value) return "red"
    else return "black"
  }

  // define style rules for contourlines
  let paintRules = [
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineSymbolizer({
        color: dynamicColor,
        width: 1.1,
        opacity: 0.4,
      }),
      filter: (z,f) => { return f.props.height > 0 && f.props.nth_line in [5, 10] == true}
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

  // define style rules for labels
  let labelRules = [
    {
      dataLayer: "contour",
      symbolizer: new protomapsL.LineLabelSymbolizer({
        labelProps:["height"],
        label_props:["height"],
        fill: 'black',
        width: 2,
        font: '400 12px sans-serif',
        stroke: 'red'
      })
      //filter: (z,f) => { return f.props.nth_line in [5, 10] == true}
    }
  ]

  // display the layer by curling the pmtiles file and fitting it with the stylesheet
  let layer = protomapsL.leafletLayer({
    url:'http://127.0.0.1:8081/contourlines.pmtiles',
    paintRules,
    labelRules,
  }).addTo(map)

  // refresh the page when new data is entered
  document.getElementById("minimumAltitude").addEventListener('keyup', function(e){
    if(e.key == 'Enter')
    layer.redraw();
  })

  document.getElementById("maximumAltitude").addEventListener('keyup', function(e){
    if(e.key == 'Enter')
    layer.redraw();
  })
}

run()