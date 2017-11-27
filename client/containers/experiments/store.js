import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { WeatherStation, ForecastRegion, HotZone } from 'api/schemas'
import { getEntitiesForSchema } from 'getters/entities'
import { loadWeatherStations, loadFeaturesMetadata } from 'actions/entities'
import Container from './Container'

function getDataForSchema(schema) {
    return createStructuredSelector({
        data(state) {
            return getEntitiesForSchema(state, schema)
                .toList()
                .sortBy(item => item.get('name'))
        },
    })
}

export const WeatherStations = connect(getDataForSchema(WeatherStation), {
    load: loadWeatherStations,
})(Container)

export const ForecastRegions = connect(getDataForSchema(ForecastRegion), {
    load: loadFeaturesMetadata,
})(Container)

export const HotZones = connect(getDataForSchema(HotZone), {
    load: loadFeaturesMetadata,
})(Container)
