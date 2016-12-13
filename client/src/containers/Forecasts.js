import React from 'react'
import {compose, lifecycle, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadForecastRegions} from 'actions/entities'
import {Forecasts} from 'components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    forecastRegions => ({
        forecastRegions: forecastRegions.sortBy(entity => entity.getIn(['properties', 'name'])).toList(),
    })
)

export default compose(
    connect(mapStateToProps, {
        loadForecastRegions
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForecastRegions()
        },
    }),
    onlyUpdateForKeys(['forecastRegions']),
)(Forecasts)
