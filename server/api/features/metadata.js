var regions = require('../../season').forecast_regions;
var turf_bbox = require('turf-bbox');

function pairToObjectReducer(acc, pair) {
    acc[ pair[0] ] = pair[1];
    return acc;
}

/*
 * Add bounding box in mapbox LngLatBounds format
 * ie: [SouthWest, NorthEast]
 * see: https://www.mapbox.com/mapbox-gl-js/api/#LngLatBounds
 */
function addBoundingBox(feature) {
    //turf bbox returns as [west, south, east, north]
    // http://turfjs.org/docs/#bbox
    var b = turf_bbox(feature);
    var mbox  = [[b[0], b[1]], [b[2], b[3]]];
    var f = Object.assign({}, feature);
    f.properties = Object.assign({}, feature.properties, {'bbox': mbox});
    return f;
}
function normalizeIds(feature) {
    var id = (feature.id || feature.properties.id);
    var props = Object.assign({}, feature.properties, {'id': id});
    return Object.assign({}, feature, {'id': id, 'properties': props});
}

var norm = regions.features
        .map(addBoundingBox)
        .map(normalizeIds);

var hzrs = norm.filter(f => f.properties.type === 'hotzone');
var regs = norm.filter(f => f.properties.type !== 'hotzone');

var metadata = {
    'hot-zones': hzrs
        .map(r => [r.id, r.properties])
        .reduce(pairToObjectReducer, {}),
    'forecast-regions': regs
        .map(r => [r.id, r.properties])
        .reduce(pairToObjectReducer, {}),
};

module.exports = metadata;

