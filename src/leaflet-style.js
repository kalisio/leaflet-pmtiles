export function leaflet_style(leafletStyle, layer) {
  let paint_rules = []
  // Manage weight default value
  function ifWeight(leafletStyle) {
    if (leafletStyle['stroke'] == false) {
      return 0
    }
    if (leafletStyle.hasOwnProperty('weight')) {
      return leafletStyle['weight']
    }
    else {
      return 3
    }
  }

  // Manage color default value
  function ifColor(leafletStyle) {
    if (leafletStyle.hasOwnProperty('color')) {
      return leafletStyle['color']
    }
    else {
      return '#3388ff'	
    }
  }
  
  // Manage opacity default value
  function ifOpacity(leafletStyle) {
    if (leafletStyle.hasOwnProperty('opacity')) {
      return leafletStyle['opacity']
    }
    else {
      return 1	
    }
  }
  
  // Manage fill default value
  function ifFill(leafletStyle) {
    if (leafletStyle['fill'] == false) {
      return 'transparent'
    }
    if (leafletStyle.hasOwnProperty('fillColor') == true) {
      return leafletStyle['fillColor']
    }
    else {
      return ifColor(leafletStyle)
    }
  }

  // Manage fill opacity default value
  function ifFillOpacity(leafletStyle) {
    if (leafletStyle.hasOwnProperty('fillOpacity')) {
      return leafletStyle['fillOpacity']
    }
    else {
      return 0.2	
    }
  }
  
  // Define paint rules for point features
  if (leafletStyle.hasOwnProperty('radius')) {
    paint_rules.push({
      dataLayer: layer, 
      filter: (z,f) => f.geomType == 1,
      symbolizer: new protomapsL.CircleSymbolizer({
        radius: leafletStyle['radius'],
        fill: ifFill(leafletStyle),
        opacity: ifOpacity(leafletStyle),
        width: ifWeight(leafletStyle),
        stroke: ifColor(leafletStyle)
      })
    })
  }
  
  // Define paint rules for line features   
  paint_rules.push({
    dataLayer: layer,  
    symbolizer: new protomapsL.LineSymbolizer({
      width: ifWeight(leafletStyle),
      color: ifColor(leafletStyle),
      opacity: ifOpacity(leafletStyle),
      dash: leafletStyle['dashArray'],
      dashColor: ifColor(leafletStyle),
      dashWidth: ifWeight(leafletStyle)
    })
  })

  // Define paint rules for polygon features
  paint_rules.push({
    dataLayer: layer,    
    filter: (z,f) => f.geomType == 3,
    symbolizer: new protomapsL.PolygonSymbolizer({
      //width: ifWeight(leafletStyle),
      //stroke: ifColor(leafletStyle),
      fill: ifFill(leafletStyle),
      opacity: ifFillOpacity(leafletStyle)
    })
  })

  // Support v1.x as well as v2.x
  return { paint_rules, paintRules: paint_rules, tasks: [] }
}