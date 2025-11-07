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
  return dash.map((value) => parseFloat(value))
}

export function kdk_style(style, dataLayer)
{
  const paintRules = [] // { id, minzoom, maxzoom, dataSource, dataLayer, symbolizer, filter }
  // filter(z, feature)

  if (style.line) {
    paintRules.push({
      dataLayer: dataLayer,
      filter: (z, feature) => feature.geomType === 2,
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
    paintRules.push({
      dataLayer: dataLayer,
      filter: (z, feature) => feature.geomType === 3,
      symbolizer: new PolygonSymbolizer({
        // pattern: ,
        fill: style.polygon.color,
        opacity: style.polygon.opacity,
        // stroke: ,
        // width: ,
        // perFeature:
      })
    })

    if (style.polygon.stroke) {
      paintRules.push({
        dataLayer: dataLayer,
        filter: (z, feature) => feature.geomType === 3,
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
  
  return { paint_rules: paintRules, paintRules }
}
