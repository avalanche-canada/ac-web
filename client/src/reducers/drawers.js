import {handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {MENU_OPENED, MENU_CLOSED, LAYER_TOGGLED,FILTER_CHANGED} from 'actions/drawers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_CONDITION_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    SURFACE_HOAR,
    WEATHER_STATION,
} from 'constants/map/layers'

function setOpen(state, open) {
    return {
        ...state,
        open
    }
}

function toggleLayer({layers, ...rest}, name) {
    if (layers.has(name)) {
        layers.delete(name)
    } else {
        layers.add(name)
    }

    return {
        ...rest,
        layers: new Set([...layers]),
    }
}

function changeFilter({filters, ...rest}, {layer, name, value}) {
    let filter = filters.get(layer).get(name)

    if (typeof value === 'object') {
        filter = {
            ...filter,
            ...value,
        }
    } else {
        filter = {
            ...filter,
            value,
        }
    }

    filters.get(layer).set(name, filter)

    return {
        ...rest,
        filters: new Map([...filters])
    }
}

const MENU = {
    open: false,
    // Defines to default active layers, could comes from localStorage as well
    layers: new Set([MOUNTAIN_INFORMATION_NETWORK]),
    // layers: new Set([FORECASTS, HOT_ZONE_REPORTS, MOUNTAIN_INFORMATION_NETWORK]),
    // Defines to default filters, could comes from localStorage as well
    filters: new Map([
        [MOUNTAIN_INFORMATION_NETWORK, new Map([
            ['days', {
                type: 'listOfValues',
                // value: '7',
                value: '60',
                options: new Map([
                    ['1', '1 day'],
                    ['3', '3 days'],
                    ['7', '7 days'],
                    ['14', '14 days'],
                    ['30', '30 days'],
                    ['60', '60 days'],
            ])}],
            ['type', {
                type: 'listOfValues',
                value: 'all',
                options: new Map([
                    ['all', 'All reports'],
                    ['quick', 'Quick'],
                    ['avalanche', 'Avalanche'],
                    ['snowpack', 'Snowpack'],
                    ['weather', 'Weather'],
                    ['incident', 'Incident'],
            ])}],
        ])]
    ]),
}

export default combineReducers({
    menu: handleActions({
        [MENU_OPENED]: state => setOpen(state, true),
        [MENU_CLOSED]: state => setOpen(state, false),
        [LAYER_TOGGLED]: (state, {payload}) => toggleLayer(state, payload),
        [FILTER_CHANGED]: (state, {payload}) => changeFilter(state, payload),
    }, MENU),
})

export function getMenu(state) {
    return state.drawers.menu
}

export function getLayers(state) {
    return getMenu(state).layers
}

export function getFilters(state) {
    return getMenu(state).filters
}
