export const geo_layers = [
    {
        'id': 'garden_area',
        'type': 'fill',
        'source': 'garden',
        'layout': {},
        'paint': {
            'fill-color': '#0080ff',
            'fill-opacity': 0.2
        }
    },
    {
        'id': 'garden_border',
        'type': 'line',
        'source': 'garden',
        'layout': {},
        'paint': {
            'line-color': '#0F0',
            'line-width': 1
        }
    },
    {
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
    }
]