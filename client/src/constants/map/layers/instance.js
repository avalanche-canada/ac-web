import Immutable from 'immutable'
import * as LAYERS from 'constants/map/layers'

const {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_CONDITION_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    SURFACE_HOAR,
    WEATHER_STATION,
    TOYOTA_TRUCK_REPORTS,
} = LAYERS

const Layer = Immutable.Record({
    type: null,
    title: null,
    active: false,
    filters: [],
}, 'Layer')

export default new Immutable.Map({
    [FORECASTS]: new Layer({
        title: 'Forecasts',
        type: 'Analysis',
    }),
    [HOT_ZONE_REPORTS]: new Layer({
        title: 'Hot zone reports',
        type: 'Analysis',
    }),
    [MOUNTAIN_INFORMATION_NETWORK]: new Layer({
        title: 'Mountain information network',
        type: 'Observations',
    }),
    [TOYOTA_TRUCK_REPORTS]: new Layer({
        title: 'Follow AvCan Toyota trucks',
        type: 'Sponsor',
    }),
    // [MOUNTAIN_CONDITION_REPORTS]: new Layer({
    //     title: 'Mountain condition reports',
    //     type: 'Observations',
    // }),
    // [METEOGRAMS]: new Layer({
    //     title: 'Meteograms',
    //     type: 'Observations',
    // }),
    // [SURFACE_HOAR]: new Layer({
    //     title: 'Surface hoar',
    //     type: 'Observations',
    // }),
    // [WEATHER_STATION]: new Layer({
    //     title: 'Weather stations',
    //     type: 'Observations',
    // }),
})
