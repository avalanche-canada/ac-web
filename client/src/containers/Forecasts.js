import {compose, lifecycle, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadFeaturesMetadata} from 'actions/entities'
import {Forecasts} from 'components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    forecastRegions => ({
        forecastRegions: forecastRegions.sortBy(
            entity => entity.get('name')
        ).toList(),
    })
)

export default compose(
    connect(mapStateToProps, {
        loadFeaturesMetadata
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadFeaturesMetadata()
        },
    }),
    onlyUpdateForKeys(['forecastRegions']),
)(Forecasts)
