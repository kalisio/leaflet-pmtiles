export function getGeometryType(f) {
  if (f.geomType === 1) return 'Point'
  else if (f.geomType === 2) return 'LineString'
  else return 'Polygon'
}

