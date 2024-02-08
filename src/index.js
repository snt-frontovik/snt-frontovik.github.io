import { GeoSource } from "./libs/geosource";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicjEwMDBydSIsImEiOiJjbGpucHJncDUxOThjM3FudTc3ZXVnZWNmIn0.kAJocXlJ7FGy52YcaDK8TQ';

const el_geomap = document.getElementById('geomap');
const geomap = new mapboxgl.Map({
    container: el_geomap,
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [37.72862595729967, 56.50241371285557],
    zoom: 14,
    scrollZoom: scroll || false
});
geomap.scrollZoom.disable();
geomap.addControl(new mapboxgl.NavigationControl());
geomap.on('load', ()=> {
    const coords_area = [
        [37.72500241250211, 56.50694831287842],
        [37.72543182949957, 56.5067547421547],
        [37.72559564557491, 56.5066378307927],
        [37.72646404728886, 56.50603571789327],
        [37.726740709211185, 56.50593286453329],
        [37.72679018249727, 56.50590475416686],
        [37.72630518169285, 56.50474774873015],
        [37.72547116986294, 56.50212160895802],
        [37.72536340280368, 56.5018384995071],
        [37.72510857354669, 56.5014026526064],
        [37.72475759985937, 56.500846578821154],
        [37.724071991664914, 56.49975193511486],
        [37.72366282089439, 56.49911714234392],
        [37.72206402920466, 56.5003445351293],
        [37.721260962552776, 56.50113395300295],
        [37.72130580929024, 56.50168722465139],
        [37.72176283011123, 56.50211321604024],
        [37.725164486661924, 56.50178754522835],
        [37.72533031693004, 56.50207321607286],
        [37.7243612192803, 56.50279525839983],
        [37.723796861148344, 56.50342189707089],
        [37.724651335971004, 56.50573633614002],
        [37.7244131807212, 56.505778848125885],
        [37.72448013772603, 56.50595235021302],
        [37.72465278581785, 56.50593772310651],
        [37.724847669743895, 56.506457320793146],
        [37.72500241250211, 56.50694831287842],
    ]
    const source_garden = new GeoSource();
    source_garden.addFeature('Polygon', [coords_area]);
    geomap.addSource('garden', source_garden);

    const source_labels = new GeoSource();
    source_labels.addFeature('Point', [37.72540187415183, 56.505508952502396], {
        title: "СНТ Фронтовик",
        description: "уч. 1-44",
        icon: 'garden'
    });
    source_labels.addFeature('Point', [37.723170276250954, 56.50152997877572], {
        title: "СНТ Фронтовик",
        description: "уч. 45-81",
        icon: 'garden'
    });
    source_labels.addFeature('Point', [37.75304478817003, 56.50188153547151], {
        title: "Ольявидово",
        description: "поселок"
    });
    geomap.addSource('labels', source_labels);

    geomap.addLayer({
        'id': 'garden_area',
        'type': 'fill',
        'source': 'garden', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.2
        }
    });
    geomap.addLayer({
        'id': 'garden_border',
        'type': 'line',
        'source': 'garden', // reference the data source
        'layout': {},
        'paint': {
            'line-color': '#0F0',
            'line-width': 1
        }
    });

    geomap.addLayer({
        'id': 'poi-labels',
        'type': 'symbol',
        'source': 'labels',
        'layout': {
            'text-field': [
                'format',
                ['get', 'title'],
                { 'font-scale': 1.2 },
                '\n',
                {},
                ['get', 'description'],
                { 'font-scale': 0.8 }
            ],
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'icon-image': ['get', 'icon']
        },
        paint: {
            "text-color": "#ffffff",
            "text-halo-color": "#000",
            "text-halo-width": 2,
            "text-halo-blur": 1
        }
    });
    
    geomap.on('click', (e) => {
        console.log(`[${e.lngLat.lng}, ${e.lngLat.lat}],`);
    });

    geomap.fitBounds([[37.72062224559869, 56.507790579952996], [37.755126182365785, 56.49796140073093]]);
})
/*
const el_header = document.getElementById('header');
document.body.onscroll = (e) => {
    const y = document.body.getBoundingClientRect().y;
    console.log(y)
    
}
*/