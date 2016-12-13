import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadForecastRegions, loadHotZoneAreas} from 'actions/entities'
import {UnsupportedMap} from 'components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZoneArea),
    (forecastRegions, hotZones) => {
        function sorter(entity) {
            return entity.getIn(['properties', 'name'])
        }

        return {
            forecastRegions: forecastRegions.sortBy(sorter).toList(),
            hotZones: hotZones.sortBy(sorter).toList(),
        }
    }
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
