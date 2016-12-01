import {createSelector} from 'reselect'
import {Incident} from 'api/schemas'
import {getEntityForSchema} from 'getters/entities'
import {getResultsSet} from 'reducers/api/getters'
import {projectKeys} from 'utils/object'

const TERMS = {
    date: 'Date',
    location: 'Location',
    locationDescription: 'Location description',
    province: 'Province',
    mountainRange: 'Mountain range',
    coordinates: 'Coordinates',
    elevation: 'Elevation',
    activity: 'Activity',
    involvement: 'Involvement',
    fatality: 'Fatality',
    description: 'Description',
    presentTemperature: 'Present temperature',
    maxTemperature: 'Maximum temperature',
    minTemperature: 'Minimum temperature',
    '24hrTrend': '24hr trend',
    windSpeed: 'Wind speed',
    windDirection: 'Wind direction',
    skyCondition: 'Sky condition',
    precipitationTypeIntensity: 'Precipitation Type & Intensity',
    snowpack: 'Snowpack',
    '24hrSnow': '24hr snow',
    stormSnow: 'Storm snow',
    stormDate: 'Storm date',
}

function transform({documents = [], snowpack, weather, avalanches = [], ...summary}) {
    const {location, date} = summary
    // avalanche
    // const {date, size, type, trigger, elevation, aspect, slabWidth, slabThickness} = {}
    // document
    // const {href, download, date, title, source} = {}


    return {
        title: location,
        snowpack: projectKeys(snowpack, TERMS),
        weather: projectKeys(weather, TERMS),
        avalanches,
        documents,
        summary: projectKeys(summary, TERMS),
        metadata: {
            date,
            location,
        },
    }
}

function getIncident(state, {params}) {
    return getEntityForSchema(state, Incident, params.slug)
}
function getIncidentResultsSet(state, {params}) {
    return getResultsSet(state, Incident, params)
}

export default createSelector(
    getIncident,
    getIncidentResultsSet,
    (incident, resultsSet) => {
        if (!incident) {
            return {
                title: 'Loading...',
                ...resultsSet,
            }
        }

        return {
            ...resultsSet,
            ...transform(incident.toJSON()),
        }
    }
)
