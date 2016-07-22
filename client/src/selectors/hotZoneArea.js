import {createSelector} from 'reselect'
import {HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/entities'
import moment from 'moment'

function transform(hotZoneArea) {


    return {
        ...hotZoneArea,
    }
}

function getHotZoneAreas(state) {
    return getEntitiesForSchema(state, HotZoneArea)
}

function getHotZoneArea(state, {params}) {
    return getEntityForSchema(state, HotZoneArea, params.name)
}

function getName(state, {params}) {
    return params.name
}

export const getHotZoneArea = createSelector(
    getHotZoneArea,
    getName,
    (hotZoneArea, name) => {
        if (hotZoneArea) {
            hotZoneArea = transform(hotZoneArea.toJSON())

            return {
                isLoading: false,
                title: hotZoneArea.title,
                hotZoneArea,
            }
        } else {
            return {
                isLoading: true,
                title: region && region.getIn(['properties', 'name']),
            }
        }
    }
)
