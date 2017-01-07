import React, {DOM} from 'react'
import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {getEntitiesForSchema} from 'getters/entities'
import {MountainInformationNetworkSubmission as Schema} from 'api/schemas'
import {getResultsSet} from 'reducers/api/getters'
import {Column, Body} from 'components/table/managed'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import {Link} from 'react-router'
import * as Types from 'components/mountainInformationNetwork/types'
import {DateTime, Relative} from 'components/misc'
import styles from 'components/misc/Text.css'
import {getFeatureCollection} from 'getters/mapbox'
import {FORECAST_REGIONS} from 'services/mapbox/datasets'
import inside from 'turf-inside'
import turf from 'turf-helpers'

// TODO: Move this to constants folder/modules
const Titles = new Map([
    [Types.QUICK, 'Quick'],
    [Types.AVALANCHE, 'Avalanche'],
    [Types.SNOWPACK, 'Snowpack'],
    [Types.WEATHER, 'Weather'],
    [Types.INCIDENT, 'Incident'],
])


const columns = Immutable.List.of(
    Column.create({
        name: 'pin',
        property(submission) {
            const id = submission.get('subid')
            const title = submission.get('title')
            const types = submission.get('obs').map(ob => ob.get('obtype')).toSet()
            const icon = types.has(Types.INCIDENT) ? pinWithIncident : pin
            const path = `/map?panel=${Schema.getKey()}/${id}`

            return (
                <Link to={path} title={`Look at ${title} report on the map`}>
                    <img src={icon} height={30} width={20} />
                </Link>
            )
        },
        style: {
            minWidth: 40
        }
    }),
    Column.create({
        name: 'title',
        title: 'Title',
        property(submission) {
            return submission.get('title')
        },
    }),
    Column.create({
        name: 'date',
        title: 'Date',
        property(submission) {
            const date = new Date(submission.get('datetime'))

            return (
                <span>
                    <DateTime value={date} />
                    <br />
                    <small className={styles.Muted}>
                        <Relative value={date} />
                    </small>
                </span>
            )
        },
    }),
    Column.create({
        name: 'reporter',
        title: 'Reporter',
        property(submission) {
            return submission.get('user')
        },
    }),
    Column.create({
        name: 'forecast-region',
        title: 'Forecast Region',
        property(submission) {
            if (submission.has('region')) {
                const {name, id} = submission.get('region')

                return (
                    <Link to={`/map/forecasts/${id}`}>
                        {name}
                    </Link>
                )
            }

            return '-'
        }
    }),
    Column.create({
        name: 'types',
        title: 'Available reports',
        property(submission) {
            const types = submission.get('obs').map(ob => ob.get('obtype'))

            return (
                <ul>
                    {types.map(type => (
                        <li key={type}>
                            {Titles.get(type)}
                        </li>
                    ))}
                </ul>
            )
        },
    }),
)

function getSubmissionsResultsSet(state, {days}) {
    return getResultsSet(state, Schema, {days})
}

function getSubmissions(state) {
    return getEntitiesForSchema(state, Schema)
}

function getFilter(state, {types}) {
    if (types.size === 0) {
        return () => true
    }

    types = new Immutable.Set(types)

    return submission => !submission.get('obs')
        .map(ob => ob.get('obtype')).toSet()
        .intersect(types).isEmpty()
}

const runSubmissionsSpatialAnalysis = createSelector(
    getSubmissions,
    state => getFeatureCollection(state, FORECAST_REGIONS),
    (submissions, regions) => {
        if (!regions || submissions.isEmpty()) {
            return submissions
        }

        const {features} = regions

        function setRegion(submission) {
            const point = turf.point(submission.get('latlng').reverse().toArray())

            for (var i = 0; i < features.length; i++) {
                const region = features[i]

                if (inside(point, region)) {
                    return submission.set('region', region.properties)
                }
            }

            return submission
        }

        return submissions.map(setRegion)
    }
)

const getFilteredSubmissions = createSelector(
    runSubmissionsSpatialAnalysis,
    getSubmissionsResultsSet,
    getFilter,
    (submissions, {ids}, filter) => new Immutable.List(ids)
        .map(id => submissions.get(id))
        .filter(filter)
        .sortBy(submission => new Date(submission.get('datetime')))
        .reverse()
)

const createBodies = createSelector(
    getFilteredSubmissions,
    data => Immutable.List.of(
        Body.create({
            data
        })
    )
)

const messages = {
    isLoading: 'Loading submissions...',
    isError: 'An error happened while loading submissions.',
}

export default createSelector(
    createBodies,
    getSubmissionsResultsSet,
    (bodies, {isFetching, isLoaded, isError}) => {
        return {
            isLoading: isFetching,
            total: bodies.first().data.size,
            isLoaded,
            isError,
            columns,
            bodies,
            typeOptions: Titles,
            messages
        }
    }
)
