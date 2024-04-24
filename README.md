# leaflet-pmtiles

A toolset to visualise PMTiles more easily in Leaflet.js (based on https://github.com/protomaps/protomaps-leaflet).

Demos:
* [OpenMapTiles rendering](https://kalisio.github.io/leaflet-pmtiles/openmapstyle.html)

## Build

To build distribution files locally run: 
```
npm run dist
```

## Getting started

See :open_file_folder: [demo](./demo) folder for examples.

To run the demos locally:
1) launch `npm run dev` to build and copy distribution files into the demo folder,
2) serve it using `http-server -p 8080 demo`,
3) serve your PMTiles with `http-server -p 8081 pmtiles` and adjust the URL as required in demo files,
4) open http://127.0.0.1:8080/openmaptiles.html in your browser

## Features

The module exposes a `mapbox_style` function generating paint and labels rules from a [Mapbox style is a JSON document ](https://docs.mapbox.com/help/glossary/style/). This is typically useful to render PMTiles created from the [OpenMapTiles profile](https://github.com/openmaptiles/planetiler-openmaptiles).

![Image](./OpenMapTiles.png)