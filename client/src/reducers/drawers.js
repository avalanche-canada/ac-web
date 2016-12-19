import {Record, Map} from 'immutable'
import {handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {LocalStorage} from 'services/storage'
import {
    MENU_OPENED,
    MENU_CLOSED,
    FILTER_CHANGED,
    LAYER_TURNED_ON,
    LAYER_TURNED_OFF,
} from 'actions/drawers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    WEATHER_STATION,
    TOYOTA_TRUCK_REPORTS,
} from 'constants/drawers'

const LAYERS_VISIBILITY = LocalStorage.create({
    keyPrefix: 'layers-visibility'
})

const Layer = Record({
    id: null,
    type: null,
    title: null,
    visible: true,
    filters: null,
}, 'Layer')

const Filter = Record({
    name: null,
    type: null,
    value: null,
    options: null,
}, 'Filter')

const MENU = new Map({
    open: false,
    // Defines the default active layers
    layers: new Map({
        [FORECASTS]: new Layer({
            id: FORECASTS,
            title: 'Forecasts',
            type: 'Analysis',
        }),
        [HOT_ZONE_REPORTS]: new Layer({
            id: HOT_ZONE_REPORTS,
            title: 'Hot zone reports',
            type: 'Analysis',
        }),
        [MOUNTAIN_INFORMATION_NETWORK]: new Layer({
            id: MOUNTAIN_INFORMATION_NETWORK,
            title: 'Mountain information network',
            type: 'Observations',
            filters: new Map({
                days: new Filter({
                    name: 'days',
                    type: 'listOfValues',
                    value: '7',
                    options: new Map([
                        ['1', '1 day'],
                        ['3', '3 days'],
                        ['7', '7 days'],
                        ['14', '14 days'],
                        ['30', '30 days'],
                    ])
                }),
                type: new Filter({
                    name: 'type',
                    type: 'listOfValues',
                    value: new Set(),
                    options: new Map([
                        ['quick', 'Quick'],
                        ['avalanche', 'Avalanche'],
                        ['snowpack', 'Snowpack'],
                        ['weather', 'Weather'],
                        ['incident', 'Incident'],
                    ])
                })
            })
        }),
        [WEATHER_STATION]: new Layer({
            id: WEATHER_STATION,
            title: 'Weather stations',
            type: 'Observations',
            visible: Boolean(LAYERS_VISIBILITY.get(WEATHER_STATION, true)),
        }),
        [TOYOTA_TRUCK_REPORTS]: new Layer({
            id: TOYOTA_TRUCK_REPORTS,
            title: 'Follow AvCan Toyota trucks',
            type: 'Sponsor',
            visible: Boolean(LAYERS_VISIBILITY.get(TOYOTA_TRUCK_REPORTS, true)),
        }),
    }),
})

function setLayerVisibilityFactory(visible) {
    return (state, {payload}) => {
        LAYERS_VISIBILITY.set(payload, visible)

        return state.setIn(['layers', payload, 'visible'], visible)
    }
}

export default combineReducers({
    menu: handleActions({
        [MENU_OPENED]: menu => menu.set('open', true),
        [MENU_CLOSED]: menu => menu.set('open', false),
        [LAYER_TURNED_ON]: setLayerVisibilityFactory(true),
        [LAYER_TURNED_OFF]: setLayerVisibilityFactory(false),
        [FILTER_CHANGED]: (menu, {payload}) => {
            const {layer, name, value} = payload

            return menu.setIn(['layers', layer, 'filters', name, 'value'], value)
        },
    }, MENU),
})
