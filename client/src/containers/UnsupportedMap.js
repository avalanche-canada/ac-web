import {compose, lifecycle, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion, HotZone} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadFeaturesMetadata} from 'actions/entities'
import {UnsupportedMap} from 'components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZone),
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
    connect(mapStateToProps, {loadFeaturesMetadata}),
    lifecycle({
        componentDidMount() {
            this.props.loadFeaturesMetadata()
        },
    }),
    onlyUpdateForKeys(['forecastRegions', 'hotZones']),
)(UnsupportedMap)
