import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {getStyle, getActiveFeatures} from 'getters/map'
import {getEntitiesForSchema} from 'getters/entities'
import {getDocumentsOfType} from 'getters/prismic'
import {ActiveLayerIds} from 'constants/map/layers'
import Parser from 'prismic/parser'
import * as Layers from 'constants/drawers'
import * as Schemas from 'api/schemas'

function identity(style) {
    return style
}

export default createSelector(
    getStyle,
    getActiveFeatures,
    state => getDocumentsOfType(state, 'hotzone-report'),
    (style, activeFeatures, hotZoneReports) => {
        if (!style || !style.has('id')) {
            return null
        }

        return setActiveFeatures(
            setHotZoneReports(
                style,
                hotZoneReports,
            ),
            activeFeatures
        )
    },
)

// Setting filters
const LayerToSchemaMapping = new Map([
    [Layers.FORECASTS, Schemas.ForecastRegion.getKey()],
    [Layers.HOT_ZONE_REPORTS, Schemas.HotZone.getKey()],
])
function setActiveFeatures(style, activeFeatures) {
    return style.withMutations(style => {
        const layers = style.get('layers')

        Array.from(ActiveLayerIds).forEach(([layer, ids]) => ids.forEach(id => {
            const schema = LayerToSchemaMapping.get(layer)
            const filter = ['==', 'id', '']

            if (activeFeatures.has(schema)) {
                filter[2] = activeFeatures.get(schema)
            }
            const index = layers.findIndex(layer => layer.get('id') === id)
            const path = ['layers', index, 'filter']

            style.setIn(path, new Immutable.List(filter))
        }))
    })
}

// TODO: This function run once! Assign to identity once complete!
// TODO: Need a way too kwow it has loaded!
// hotZoneReports.isEmpty() is not enough
function setHotZoneReports(style, hotZoneReports) {
    return style.withMutations(style => {
        const source = Layers.HOT_ZONE_REPORTS
        const ids = hotZoneReports.map(
            document => document.data['hotzone-report.region'].value
        ).toArray()
        const layers = style.get('layers')

        let index = layers.findIndex(layer => layer.get('id') === 'hot-zones')
        let path = ['layers', index, 'filter']

        style.setIn(path, Immutable.List.of('!in', 'id', ...ids))

        index = layers.findIndex(layer => layer.get('id') === 'opened-hot-zones')
        path = ['layers', index, 'filter'],

        style.setIn(path, Immutable.List.of('in', 'id', ...ids))
    })
}
