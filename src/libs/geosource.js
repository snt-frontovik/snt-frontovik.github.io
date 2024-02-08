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

export class GeoSource {
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