import { LineSymbolizer, PolygonSymbolizer } from 'protomaps-leaflet'

function dashArrayToCanvasDash(dashArray) {
  // transform from
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dasharray
  // to
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
  // NOTE: this does a simple conversion and won't correctly convert
  // from dashArray expressed in percentages
  // Target dash is expressed in canvas units
  let dash = dashArray ? dashArray.split(/ |,/) : []
  return dash.length ? dash.map((value) => parseFloat(value)) : null
}

export function kdk_style(style, dataLayer) {
  const paintRules = [] // { id, minzoom, maxzoom, dataSource, dataLayer, symbolizer, filter }
  // filter(z, feature)

  // For each rule, we add a kdkFilter member so that users that would like
  // to update the filter can still reference the kdk style specific filter bit.

  if (style.line) {
    // Will only apply to line geometry
    const kdkFilterFn = (zoom, feature) => feature.geomType === 2

    paintRules.push({
      dataLayer: dataLayer,
      kdkFilter: kdkFilterFn,
      filter: kdkFilterFn,
      symbolizer: new LineSymbolizer({
        color: style.line.color,
        width: style.line.width,
        opacity: style.line.opacity,
        dash: dashArrayToCanvasDash(style.line.dashArray),
        // dashColor: ,
        // dashWidth: ,
        // skip: ,
        // perFeature: ,
        lineCap: style.line.cap,
        lineJoin: style.line.join
      })
    })
  }

  if (style.polygon) {
    // Will only apply to polygon geometry
    const kdkFilterFn = (zoom, feature) => feature.geomType === 3

    paintRules.push({
      dataLayer: dataLayer,
      kdkFilter: kdkFilterFn,
      filter: kdkFilterFn,
      symbolizer: new PolygonSymbolizer({
        // pattern: ,
        fill: style.polygon.color,
        opacity: style.polygon.opacity,
        // stroke: ,
        width: 0,
        // perFeature:
      })
    })

    if (style.polygon.stroke) {
      paintRules.push({
        dataLayer: dataLayer,
        kdkFilter: kdkFilterFn,
        filter: kdkFilterFn,
        symbolizer: new LineSymbolizer({
          color: style.polygon.stroke.color,
          width: style.polygon.stroke.width,
          opacity: style.polygon.stroke.opacity,
          dash: dashArrayToCanvasDash(style.polygon.stroke.dashArray),
          // dashColor: ,
          // dashWidth: ,
          // skip: ,
          // perFeature: ,
          lineCap: style.polygon.stroke.cap,
          lineJoin: style.polygon.stroke.join
        })
      })
    }
  }
  
  return { paintRules }
}
