import {compose, lifecycle, defaultProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {ForecastRegion} from '/api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadFeaturesMetadata} from 'actions/entities'
import {PageList} from '/components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    forecastRegions => ({
        items: forecastRegions.sortBy(
            entity => entity.get('name')
        ).map(
            entity => ({
                link: `/forecasts/${entity.get('id')}`,
                name: entity.get('name'),
            })
        ).toList(),
    })
)

export default compose(
    defaultProps({
        title: 'Forecast regions',
        headline: 'Click on a link below to read the avalanche bulletin.',
    }),
    connect(mapStateToProps, {
        loadFeaturesMetadata
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadFeaturesMetadata()
        },
    }),
)(PageList)
