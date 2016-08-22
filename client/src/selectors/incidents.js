import {createSelector} from 'reselect'
import {Incident} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSetForSchema} from 'reducers/api/getters'

const {assign} = Object

const getIncidents = createSelector(
    state => getEntitiesForSchema(state, Incident),
    incidents => {

        return incidents
    }
)

const RESULTS = {
    isError: false,
    isFetching: false,
    isLoaded: false,
}
const YEAR = new Date().getFullYear()
function computeYear(value, index) {
    return YEAR - index
}
function toArray(year) {
    return [year, String(year)]
}

const STATE = {
    incidents: [],
    messages: {
        error: 'Error happened while loading incidents.',
        loading: 'Loading incidents...',
    },
    pagination: null,
    typeOfInvolementOptions: new Map([
        ['fatal-avalanches', 'fatal avalanches'],
        ['non-fatal-avalanches', 'non-fatal avalanches'],
    ]),
    seasonOptions: new Map(
        Array(10).fill(null).map(computeYear).map(toArray)
    ),
    provinceOptions: new Map([
        ['AB', 'Alberta'],
        ['BC', 'British Columbia'],
        ['MB', 'Manitoba'],
        ['NB', 'New Brunswick'],
        ['NL', 'Newfoundland and Labrador'],
        ['NT', 'Northwest Territories'],
        ['NS', 'Nova Scotia'],
        ['NU', 'Nunavut'],
        ['ON', 'Ontario'],
        ['PE', 'Prince Edward Island'],
        ['QC', 'Quebec'],
        ['SK', 'Saskatchewan'],
        ['YT', 'Yukon'],
        [null, 'Unknown'],
    ]),
    activityOptions: new Map([
        ['Unknown', 'Unknown'],
        ['Backcountry Skiing', 'Backcountry Skiing'],
        ['Out-of-bounds Skiing', 'Out-of-bounds Skiing'],
        ['Mechanized Skiing', 'Mechanized Skiing'],
        ['Snowmobiling', 'Snowmobiling'],
        ['Mountaineering', 'Mountaineering'],
        ['Ice Climbing', 'Ice Climbing'],
        ['Inside Building', 'Inside Building'],
        ['Outside Building', 'Outside Building'],
        ['Inside Car/Truck on Road', 'Inside Car/Truck on Road'],
        ['At Outdoor Worksite', 'At Outdoor Worksite'],
        ['Hunting/Fishing', 'Hunting/Fishing'],
        ['Other Non-Recreational', 'Other Non-Recreational'],
        ['Snowshoeing & Hiking', 'Snowshoeing & Hiking'],
        ['Control Work', 'Control Work'],
        ['Lift Skiing Open', 'Lift Skiing Open'],
        ['Lift Skiing Closed', 'Lift Skiing Closed'],
        ['Other Recreational', 'Other Recreational'],
        ['Search and Rescue','Search and Rescue'],
    ]),
}



export default createSelector(
    getIncidents,
    state => getResultsSetForSchema(state, Incident)['null'] || RESULTS,
    (incidents, resultsSet) => {

        return {
            ...STATE,
            ...resultsSet,
        }
    }
)
