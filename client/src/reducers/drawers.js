import {Record, Map} from 'immutable'
import {handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {LocalStorage} from 'services/storage'
import * as Actions from 'actions/drawers'
import * as Layers from 'constants/drawers'

const LAYERS_VISIBILITY = LocalStorage.create({
    keyPrefix: 'layers-visibility'
})
const LAYERS_FILTERS = LocalStorage.create({
    keyPrefix: 'layers-filters'
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
        [Layers.FORECASTS]: new Layer({
            id: Layers.FORECASTS,
            title: 'Forecasts',
            type: 'Analysis',
        }),
        [Layers.HOT_ZONE_REPORTS]: new Layer({
            id: Layers.HOT_ZONE_REPORTS,
            title: 'Hot zone reports',
            type: 'Analysis',
        }),
        [Layers.SPECIAL_INFORMATION]: new Layer({
            id: Layers.SPECIAL_INFORMATION,
            title: 'Special information',
            type: 'Observations',
            // visible: Boolean(LAYERS_VISIBILITY.get(Layers.SPECIAL_INFORMATION, true)),
        }),
        [Layers.MOUNTAIN_INFORMATION_NETWORK]: new Layer({
            id: Layers.MOUNTAIN_INFORMATION_NETWORK,
            title: 'Mountain information network',
            type: 'Observations',
            filters: new Map({
                days: new Filter({
                    name: 'days',
                    type: 'listOfValues',
                    value: '7',
                    // value: String(LAYERS_FILTERS.get(`${Layers.MOUNTAIN_INFORMATION_NETWORK}-days`, '7')),
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
                    value: new Set(LAYERS_FILTERS.get(`${Layers.MOUNTAIN_INFORMATION_NETWORK}-type`, [])),
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
        [Layers.WEATHER_STATION]: new Layer({
            id: Layers.WEATHER_STATION,
            title: 'Weather stations',
            type: 'Observations',
            visible: Boolean(LAYERS_VISIBILITY.get(Layers.WEATHER_STATION, true)),
        }),
        [Layers.TOYOTA_TRUCK_REPORTS]: new Layer({
            id: Layers.TOYOTA_TRUCK_REPORTS,
            title: 'Follow AvCan Toyota trucks',
            type: 'Sponsor',
            visible: Boolean(LAYERS_VISIBILITY.get(Layers.TOYOTA_TRUCK_REPORTS, true)),
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
        [Actions.MENU_OPENED]: menu => menu.set('open', true),
        [Actions.MENU_CLOSED]: menu => menu.set('open', false),
        [Actions.LAYER_TURNED_ON]: setLayerVisibilityFactory(true),
        [Actions.LAYER_TURNED_OFF]: setLayerVisibilityFactory(false),
        [Actions.FILTER_CHANGED]: (menu, {payload}) => {
            const {layer, name, value} = payload

            let filter = value
            if (value instanceof Set) {
                filter = Array.from(value)
            }

            LAYERS_FILTERS.set(`${layer}-${name}`, filter)

            return menu.setIn(['layers', layer, 'filters', name, 'value'], value)
        },
    }, MENU),
})
