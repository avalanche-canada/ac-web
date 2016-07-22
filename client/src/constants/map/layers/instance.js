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
} = LAYERS

const Layer = Immutable.Record({
    type: null,
    title: null,
    active: true,
    disabled: false,
    filters: {},
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
    [MOUNTAIN_CONDITION_REPORTS]: new Layer({
        title: 'Mountain conditions reports',
        type: 'Analysis',
    }),
    [METEOGRAMS]: new Layer({
        title: 'Meteograms',
        type: 'Observations',
        disabled: true,
    }),
    [MOUNTAIN_INFORMATION_NETWORK]: new Layer({
        title: 'Mountain information network',
        type: 'Observations',
    }),
    [SURFACE_HOAR]: new Layer({
        title: 'Surface hoar',
        type: 'Observations',
        disabled: true,
    }),
    [WEATHER_STATION]: new Layer({
        title: 'Weather station',
        type: 'Observations',
        disabled: true,
    }),
})
