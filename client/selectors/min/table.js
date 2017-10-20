import React from 'react'
import Immutable from 'immutable'
import { createSelector } from 'reselect'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import { getEntitiesForSchema } from 'getters/entities'
import { MountainInformationNetworkSubmission as Schema } from 'api/schemas'
import { getResultsSet } from 'getters/api'
import { Column, Body } from 'components/table/managed'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import { Link } from 'react-router-dom'
import { DateTime, Relative } from 'components/time'
import { getFeatureCollection } from 'getters/mapbox'
import { FORECAST_REGIONS } from 'services/mapbox/datasets'
import { computeSorting } from 'selectors/utils'
import { createSorter } from 'selectors/factories'
import { INCIDENT, NAMES } from 'constants/min'
import { NONE } from 'constants/sortings'
import styles from 'components/text/Text.css'

const columns = Immutable.List.of(
    Column.create({
        name: 'pin',
        property(submission) {
            const id = submission.get('subid')
            const title = submission.get('title')
            const types = submission
                .get('obs')
                .map(ob => ob.get('obtype'))
                .toSet()
            const icon = types.has(INCIDENT) ? pinWithIncident : pin
            const path = `/map?panel=${Schema.key}/${id}`

            return (
                <Link to={path} title={`Look at ${title} report on the map`}>
                    <img src={icon} height={30} width={20} />
                </Link>
            )
        },
        style: {
            minWidth: 40,
        },
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
        sorting: NONE,
    }),
    Column.create({
        name: 'reporter',
        title: 'Reporter',
        property(submission) {
            return submission.get('user')
        },
        sorting: NONE,
    }),
    Column.create({
        name: 'forecast-region',
        title: 'Forecast Region',
        property(submission) {
            if (submission.has('region')) {
                const { name, id } = submission.get('region')

                return <Link to={`/map/forecasts/${id}`}>{name}</Link>
            }

            return '-'
        },
        sorting: NONE,
    }),
    Column.create({
        name: 'types',
        title: 'Available reports',
        property(submission) {
            const types = submission.get('obs').map(ob => ob.get('obtype'))

            return (
                <ul>
                    {types.map(type => <li key={type}>{NAMES.get(type)}</li>)}
                </ul>
            )
        },
    })
)

function getSubmissionsResultsSet(state, { days }) {
    return getResultsSet(state, Schema, { days })
}

function getSubmissions(state) {
    return getEntitiesForSchema(state, Schema)
}

function getFilter(state, { types }) {
    if (types.size === 0) {
        return () => true
    }

    types = new Immutable.Set(types)

    return submission =>
        !submission
            .get('obs')
            .map(ob => ob.get('obtype'))
            .toSet()
            .intersect(types)
            .isEmpty()
}

const runSubmissionsSpatialAnalysis = createSelector(
    getSubmissions,
    state => getFeatureCollection(state, FORECAST_REGIONS),
    (submissions, regions) => {
        if (!regions || submissions.isEmpty()) {
            return submissions
        }

        const { features } = regions

        function setRegion(submission) {
            const point = turf.point(
                submission
                    .get('latlng')
                    .reverse()
                    .toArray()
            )

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
    (submissions, { ids }, filter) =>
        new Immutable.List(ids)
            .map(id => submissions.get(id))
            .filter(filter)
            .sortBy(submission => new Date(submission.get('datetime')))
            .reverse()
)

const sorters = new Map([
    ['date', submission => new Date(submission.get('datetime'))],
    ['reporter', submission => submission.get('user')],
    [
        'forecast-region',
        submission =>
            submission.has('region') ? submission.get('region').name : 'z',
    ],
])

function getSorting(state, props) {
    return computeSorting(props.sorting)
}

const getSortedSubmissions = createSorter(
    getFilteredSubmissions,
    getSorting,
    sorters
)

const createBodies = createSelector(getSortedSubmissions, data =>
    Immutable.List.of(
        Body.create({
            data,
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
    getSorting,
    (bodies, { isFetching, isLoaded, isError }, [name, order]) => {
        return {
            isLoading: isFetching,
            total: bodies.reduce((total, body) => total + body.data.size, 0),
            isLoaded,
            isError,
            columns: columns.map(column =>
                column.set(
                    'sorting',
                    column.sorting
                        ? column.name === name ? order : NONE
                        : undefined
                )
            ),
            bodies,
            typeOptions: NAMES,
            messages,
        }
    }
)
