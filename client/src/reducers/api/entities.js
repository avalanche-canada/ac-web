import {Map} from 'immutable'

export default function entities(state = new Map(), {payload, meta}) {
    if (payload && payload.entities) {
        // Has to be mergeDeep, merge only will get rid of existing features
        // Example: Initial WEATHER_STATIONS_SUCCESS will add all stations
        // and WEATHER_STATIONS_SUCCESS for a given one remove others...
        return state.mergeDeep(payload.entities)
    }

    return state
}
