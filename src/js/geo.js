import { geo_area, geo_points } from './geo-data';
import { geo_layers } from "./geo-layers";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicjEwMDBydSIsImEiOiJjbGpucHJncDUxOThjM3FudTc3ZXVnZWNmIn0.kAJocXlJ7FGy52YcaDK8TQ';

class Feature {
    type = 'Feature';
    geometry = {
        type: 'Point',
        coordinates: []
    }

    constructor(type, coordinates = [], properties = {}) {
        this.geometry.type = type;
        this.geometry.coordinates = coordinates;
        this.properties = properties;
    }
}

class GeoSource {
    type = 'geojson';
    data = {
        'type': 'FeatureCollection',
        'features': []
    };

    addFeature(type, coordinates = [], properties = {}) {
        const feature = new Feature(type, coordinates, properties);
        this.data.features.push(feature);
        return feature;
    }
}

class Geo {
    #_el_geomap = document.getElementById('geomap');
    #_geomap;

    constructor() {
        this.#_geomap = new mapboxgl.Map({
            container: this.#_el_geomap,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [37.72862595729967, 56.50241371285557],
            zoom: 14,
            scrollZoom: true
        });

        this.#_geomap.scrollZoom.disable();
        this.#_geomap.addControl(new mapboxgl.NavigationControl());
        this.#_geomap.on('load', ()=> {
            this.#_onMapLoad();
        })
    }

    #_onMapLoad() {
        const source_garden = new GeoSource();
        source_garden.addFeature('Polygon', [geo_area]);
        this.#_geomap.addSource('garden', source_garden);
    
        const source_labels = new GeoSource();
        geo_points.forEach(point => {
            source_labels.addFeature('Point', point.coords, point.props);
        })
        this.#_geomap.addSource('labels', source_labels);
        
        geo_layers.forEach(layer => {
            this.#_geomap.addLayer(layer);
        })
       
        
        this.#_geomap.on('click', (e) => {
            console.log(`[${e.lngLat.lng}, ${e.lngLat.lat}],`);
        });
    
        this.#_geomap.fitBounds([[37.72062224559869, 56.507790579952996], [37.755126182365785, 56.49796140073093]]);
    }
}



export const geo = new Geo();