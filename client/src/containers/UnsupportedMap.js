import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys, withProps, withHandlers, withState, getContext} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/getters'
import {loadForecastRegions, loadHotZoneAreas} from 'actions/entities'
import {UnsupportedMap} from 'components/page'
import {Link} from 'react-router'

function sorter(entity) {
    return entity.getIn(['properties', 'name'])
}

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZoneArea),
    (forecastRegions, hotZones) => ({
        forecastRegions: forecastRegions.sortBy(sorter).toList(),
        hotZones: hotZones.sortBy(sorter).toList(),
    })
)

export default compose(
    connect(mapStateToProps, {
        loadForecastRegions,
        loadHotZoneAreas,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForecastRegions, loadHotZoneAreas} = this.props

            loadForecastRegions()
            loadHotZoneAreas()
        },
    }),
    onlyUpdateForKeys(['forecastRegions', 'hotZones']),
)(UnsupportedMap)
