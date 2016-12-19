import {createSelector} from 'reselect'
import {getEntitiesForSchema} from 'getters/entities'
import {getDocumentsOfType} from 'getters/prismic'
import * as Schemas from 'api/schemas'
import {featureCollection} from 'turf-helpers'

function toJSON(entity) {
    if (entity && typeof entity.toJSON === 'function') {
        return entity.toJSON()
    }

    return entity
}

const RouteSchemaMapping = new Map([
    [Schemas.ForecastRegion, Schemas.Forecast],
    [Schemas.HotZone, Schemas.HotZoneReport],
])

const createActiveFeatureSelectorFromRoute = schema => {
    const path = RouteSchemaMapping.get(schema).getKey()
    const isActiveRoute = route => route.path === path

    return createSelector(
        (state, props) => props.params.name,
        (state, props) => props.routes,
        state => getEntitiesForSchema(state, schema),
        (name, routes, entities) => {
            if (routes.find(isActiveRoute)) {
                return toJSON(entities.get(name))
            }
        }
    )
}

const createActiveFeatureSelectorFromQuery = schema => {
    const key = typeof schema === 'string' ? schema : schema.getKey()
    const regExp = new RegExp(`^${key}`)
    const getResources = typeof schema === 'string' ?
        state => getDocumentsOfType(state, key) :
        state => getEntitiesForSchema(state, schema)

    return createSelector(
        (state, props) => props.location.query.panel,
        getResources,
        (panel, resources) => {
            if (regExp.test(panel)) {
                const id = panel.split('/')[1]

                return toJSON(resources.get(id))
            }
        }
    )
}

export const getActiveFeatures = createSelector(
    createActiveFeatureSelectorFromRoute(Schemas.ForecastRegion),
    createActiveFeatureSelectorFromRoute(Schemas.HotZone),
    createActiveFeatureSelectorFromQuery(Schemas.MountainInformationNetworkSubmission),
    createActiveFeatureSelectorFromQuery(Schemas.WeatherStation),
    createActiveFeatureSelectorFromQuery('toyota-truck-reports'),
    (...features) => featureCollection(features.filter(Boolean))
)
