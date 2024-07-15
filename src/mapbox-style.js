// Some changes have been required in the style and in the original compat/json_style function of the protomaps-leaflet module to make rendering better:
// - background layer type not supported => converted to fill but does not seem to work, to be managed at layer level through backgroundColor
// - text field for labels should be rewritten and not yet support multiple ones => need to rewrite things like "text-field": "{name:latin} {name:nonlatin}" to "text-field": "name:latin"
// - stops not supported on numbers => added things like "opacity: numberOrFn(layer.paint["fill-opacity"])" whenever required
// - hsla colors not supported => converted to hex + opacity
// - circle/line opacity not supported => added things like "opacity: numberOrFn(layer.paint["line-opacity"])" whenever required
// - fonts partially supported but not loaded from pbf like tileservergl => need to be implemented, using default one for now
// - stops not supported on colors => need to be implemented
// - sprites partially supported but not loaded from atlas like tileservergl => need to be implemented
// For reference see https://github.com/protomaps/protomaps-leaflet/issues/121
import {
  CenteredTextSymbolizer,
  CircleSymbolizer,
  LineLabelSymbolizer,
  LineSymbolizer,
  PolygonSymbolizer,
  exp } from 'protomaps-leaflet'

function number(val, defaultValue) {
  return typeof val === "number" ? val : defaultValue
}

function getGeomType(f) {
  if (f.geomType === 1) return 'Point'
  else if (f.geomType === 2) return 'LineString'
  else return 'Polygon'
}

export function filterFn(arr) {
  if (arr.includes("$type")) {
    if (arr[0] === "==") {
      return (z, f) => getGeomType(f) === arr[2]
    }
  }
  if (arr[0] === "==") {
    return (z, f) => f.props[arr[1]] === arr[2]
  }
  if (arr[0] === "!=") {
    return (z, f) => f.props[arr[1]] !== arr[2]
  }
  if (arr[0] === "!") {
    const sub = filterFn(arr[1])
    return (z, f) => !sub(z, f)
  }
  if (arr[0] === "<") {
    return (z, f) => number(f.props[arr[1]], Infinity) < arr[2]
  }
  if (arr[0] === "<=") {
    return (z, f) => number(f.props[arr[1]], Infinity) <= arr[2]
  }
  if (arr[0] === ">") {
    return (z, f) => number(f.props[arr[1]], -Infinity) > arr[2]
  }
  if (arr[0] === ">=") {
    return (z, f) => number(f.props[arr[1]], -Infinity) >= arr[2]
  }
  if (arr[0] === "in") {
    return (z, f) => arr.slice(2, arr.length).includes(f.props[arr[1]])
  }
  if (arr[0] === "!in") {
    return (z, f) => !arr.slice(2, arr.length).includes(f.props[arr[1]])
  }
  if (arr[0] === "has") {
    return (z, f) => f.props.hasOwnProperty(arr[1])
  }
  if (arr[0] === "!has") {
    return (z, f) => !f.props.hasOwnProperty(arr[1])
  }
  if (arr[0] === "all") {
    const parts = arr.slice(1, arr.length).map((e) => filterFn(e))
    return (z, f) =>
      parts.every((p) => {
        return p(z, f)
      })
  }
  if (arr[0] === "any") {
    const parts = arr.slice(1, arr.length).map((e) => filterFn(e))
    return (z, f) =>
      parts.some((p) => {
        return p(z, f)
      })
  }
  console.log("Unimplemented filter: ", arr[0])
  return (f) => false
}

export function numberFn(obj) {
  if (obj.stops) {
    return (z) => {
      return exp(obj.base || 1, obj.stops)(z - 1)
    }
  }
  if (
    obj[0] === "interpolate" &&
    obj[1][0] === "exponential" &&
    obj[2][0] === "zoom"
  ) {
    const slice = obj.slice(3)
    const stops = []
    for (let i = 0; i < slice.length; i += 2) {
      stops.push([slice[i], slice[i + 1]])
    }
    return (z) => {
      return exp(obj[1][1], stops)(z - 1)
    }
  }
  if (obj[0] === "step" && obj[1][0] === "get") {
    const slice = obj.slice(2)
    const prop = obj[1][1]
    return (z, f) => {
      const val = f?.props[prop]
      if (typeof val === "number") {
        if (val < slice[1]) return slice[0]
        for (let i = 1; i < slice.length; i += 2) {
          if (val <= slice[i]) return slice[i + 1]
        }
      }
      return slice[slice.length - 1]
    }
  }
  console.log("Unimplemented numeric fn: ", obj)
  return (z) => 1
}

export function numberOrFn(
  obj,
  defaultValue = 0,
) {
  if (!obj) return defaultValue
  if (typeof obj === "number") {
    return obj
  }
  // If feature f is defined, use numberFn, otherwise use defaultValue
  return (z, f) => (f ? numberFn(obj)(z, f) : defaultValue)
}

export function widthFn(width_obj, gap_obj) {
  const w = numberOrFn(width_obj, 1)
  const g = numberOrFn(gap_obj)
  return (z, f) => {
    const tmp = typeof w === "number" ? w : w(z, f)
    if (g) {
      return tmp + (typeof g === "number" ? g : g(z, f))
    }
    return tmp
  }
}

export function getFont(obj, fontsubmap) {
  const fontfaces = []
  for (const wanted_face of obj["text-font"]) {
    if (fontsubmap.hasOwnProperty(wanted_face)) {
      fontfaces.push(fontsubmap[wanted_face])
    }
  }
  if (fontfaces.length === 0) fontfaces.push({ face: "sans-serif" })

  const text_size = obj["text-size"]
  // for fallbacks, use the weight and style of the first font
  let weight = ""
  if (fontfaces.length && fontfaces[0].weight)
    weight = `${fontfaces[0].weight} `
  let style = ""
  if (fontfaces.length && fontfaces[0].style) style = `${fontfaces[0].style} `

  if (typeof text_size === "number") {
    return (z) =>
      `${style}${weight}${text_size}px ${fontfaces
        .map((f) => f.face)
        .join(", ")}`
  }
  if (text_size.stops) {
    let base = 1.4
    if (text_size.base) base = text_size.base
    else text_size.base = base
    const t = numberFn(text_size)
    return (z, f) => {
      return `${style}${weight}${t(z, f)}px ${fontfaces
        .map((f) => f.face)
        .join(", ")}`
    }
  }
  if (text_size[0] === "step") {
    const t = numberFn(text_size)
    return (z, f) => {
      return `${style}${weight}${t(z, f)}px ${fontfaces
        .map((f) => f.face)
        .join(", ")}`
    }
  }
  console.log("Can't parse font: ", obj)
  return (z) => "12px sans-serif"
}

export function mapbox_style(obj, fontsubmap) {
  const paint_rules = []
  const label_rules = []
  const refs = new Map()

  for (const layer of obj.layers) {
    refs.set(layer.id, layer)

    if (layer.layout && layer.layout.visibility === "none") {
      continue
    }
    // ignore background layer as this should be managed by backgroundColor
    if (layer.type === "background") {
      continue
    }

    if (layer.ref) {
      const referenced = refs.get(layer.ref)
      layer.type = referenced.type
      layer.filter = referenced.filter
      layer.source = referenced.source
      layer["source-layer"] = referenced["source-layer"]
    }

    const sourceLayer = layer["source-layer"]
    let symbolizer

    let filter = undefined
    if (layer.filter) {
      filter = filterFn(layer.filter)
    }

    if (layer.type === "fill") {
      paint_rules.push({
        dataLayer: layer["source-layer"],
        filter: filter,
        symbolizer: new PolygonSymbolizer({
          fill: layer.paint["fill-color"],
          opacity: numberOrFn(layer.paint["fill-opacity"], 1)
        }),
      })
    } else if (layer.type === "fill-extrusion") {
      // simulate fill-extrusion with plain fill
      paint_rules.push({
        dataLayer: layer["source-layer"],
        filter: filter,
        symbolizer: new PolygonSymbolizer({
          fill: layer.paint["fill-extrusion-color"],
          opacity: numberOrFn(layer.paint["fill-extrusion-opacity"], 1)
        }),
      })
    } else if (layer.type === "line") {
      // simulate gap-width
      if (layer.paint["line-dasharray"]) {
        paint_rules.push({
          dataLayer: layer["source-layer"],
          filter: filter,
          symbolizer: new LineSymbolizer({
            width: widthFn(
              layer.paint["line-width"],
              layer.paint["line-gap-width"],
            ),
            dash: layer.paint["line-dasharray"],
            dashColor: layer.paint["line-color"],
            opacity: numberOrFn(layer.paint["line-opacity"], 1)
          }),
        })
      } else {
        paint_rules.push({
          dataLayer: layer["source-layer"],
          filter: filter,
          symbolizer: new LineSymbolizer({
            color: layer.paint["line-color"],
            opacity: numberOrFn(layer.paint["line-opacity"], 1),
            width: widthFn(
              layer.paint["line-width"],
              layer.paint["line-gap-width"],
            ),
          }),
        })
      }
    } else if (layer.type === "symbol") {
      if (layer.layout["symbol-placement"] === "line") {
        label_rules.push({
          dataLayer: layer["source-layer"],
          filter: filter,
          symbolizer: new LineLabelSymbolizer({
            font: getFont(layer.layout, fontsubmap),
            fill: layer.paint["text-color"],
            width: layer.paint["text-halo-width"],
            stroke: layer.paint["text-halo-color"],
            textTransform: layer.layout["text-transform"],
            label_props: layer.layout["text-field"]
              ? [layer.layout["text-field"]]
              : undefined,
          }),
        })
      } else {
        label_rules.push({
          dataLayer: layer["source-layer"],
          filter: filter,
          symbolizer: new CenteredTextSymbolizer({
            font: getFont(layer.layout, fontsubmap),
            fill: layer.paint["text-color"],
            stroke: layer.paint["text-halo-color"],
            width: layer.paint["text-halo-width"],
            textTransform: layer.layout["text-transform"],
            label_props: layer.layout["text-field"]
              ? [layer.layout["text-field"]]
              : undefined,
          }),
        })
      }
    } else if (layer.type === "circle") {
      paint_rules.push({
        dataLayer: layer["source-layer"],
        filter: filter,
        symbolizer: new CircleSymbolizer({
          radius: layer.paint["circle-radius"],
          fill: layer.paint["circle-color"],
          stroke: layer.paint["circle-stroke-color"],
          width: layer.paint["circle-stroke-width"],
          opacity: numberOrFn(layer.paint["circle-opacity"], 1)
        }),
      })
    }
  }

  label_rules.reverse()
  // Support v1.x as well as v2.x
  return { paint_rules, label_rules, paintRules: paint_rules, labelRules: label_rules, tasks: [] }
}
