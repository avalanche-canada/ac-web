import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZone} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadFeaturesMetadata} from 'actions/entities'
import {UnsupportedMap} from 'components/page'
import {Link} from 'react-router'

function sorter(entity) {
    return entity.get('name')
}

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZone),
    (forecastRegions, hotZones) => ({
        forecastRegions: forecastRegions.sortBy(sorter).toList(),
        hotZones: hotZones.sortBy(sorter).toList(),
    })
)

export default compose(
    connect(mapStateToProps, {loadFeaturesMetadata}),
    lifecycle({
        componentDidMount() {
            this.props.loadFeaturesMetadata()
        },
    }),
    onlyUpdateForKeys(['forecastRegions', 'hotZones']),
)(UnsupportedMap)
