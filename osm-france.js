async function run () {
    const map = L.map('map', {
      center: [47, 2],
      zoom: 6,
      zoomControl: false,
      fullscreenControl: true
    })

    // mountain peak style
    var mountainPeakStyle = 
    {
        radius: 10,
        fillColor: "pink",
        stroke: "red",
        weight: 1,
        opacity: 0.8,
    }
    // waterways style
    var waterwaysStyle = 
    {
        color: "blue",
        weight: 1,
        opacity: 1,
        dashOffset: [2,4]
    }

    // park style
    var parkStyle = {
        fillColor: "green",
        opacity: 0.8
    }

    function transformLineToProtomapsStyle(paint_rules, layername, leafletstyle) {
            paint_rules.push({   
            dataLayer: layername,
            symbolizer: new protomapsL.LineSymbolizer({
                color: leafletstyle["color"],
                width: leafletstyle["weight"],
                opacity: leafletstyle["opacity"],
                dashColor: leafletstyle["color"],
                dash: leafletstyle['dashOffset'],
            }),
            })
        return paint_rules
    };

    function transformPolygonToProtomapsStyle(paint_rules, layername, leafletstyle) {
        paint_rules.push({   
        dataLayer: layername,
        symbolizer: new protomapsL.PolygonSymbolizer({
            fill: leafletstyle["fillColor"],
            width: leafletstyle["weight"],
            opacity: leafletstyle["opacity"],
            stroke: leafletstyle['stroke'],
            /*perFeature: ,
            doStroke: ,
            pattern: ,*/
        }),
        })
    return paint_rules
    }

    function transformCircleToProtomapsStyle(paint_rules, layername, leafletstyle) {
        paint_rules.push({   
            dataLayer: layername,
            symbolizer: new protomapsL.CircleSymbolizer({
                radius: leafletstyle['radius'],
                fill: leafletstyle["fillColor"],
                width: leafletstyle["weight"],
                opacity: leafletstyle["opacity"],
                stroke: leafletstyle['stroke'],
            }),
            })
        return paint_rules
    }


    let paintRules = []
    transformLineToProtomapsStyle(paintRules, 'waterway', waterwaysStyle)
    transformPolygonToProtomapsStyle(paintRules, 'park', parkStyle)
    transformCircleToProtomapsStyle(paintRules, 'mountain_peak', mountainPeakStyle)

    console.log(paintRules)
    
    // define dynamic paint rules
    
    // display the layer by curling the pmtiles file and fitting it with the stylesheet
    let yoyo = protomapsL.leafletLayer({
        url:'http://127.0.0.1:8081/osm-france.pmtiles',
        paintRules
    }).addTo(map)
}
  
run()