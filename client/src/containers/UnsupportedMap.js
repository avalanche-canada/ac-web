import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZone} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadForecastRegions, loadHotZones} from 'actions/entities'
import {UnsupportedMap} from 'components/page'
import {Link} from 'react-router'

function sorter(entity) {
    return entity.getIn(['properties', 'name'])
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
    connect(mapStateToProps, {
        loadForecastRegions,
        loadHotZones,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForecastRegions, loadHotZones} = this.props

            loadForecastRegions()
            loadHotZones()
        },
    }),
    onlyUpdateForKeys(['forecastRegions', 'hotZones']),
)(UnsupportedMap)
