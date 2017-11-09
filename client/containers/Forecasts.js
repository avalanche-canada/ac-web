import { compose, lifecycle, defaultProps } from 'recompose'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ForecastRegion } from 'api/schemas'
import { getEntitiesForSchema } from 'getters/entities'
import { loadFeaturesMetadata } from 'actions/entities'
import { PageList } from 'components/page'
import externals from 'router/externals'

function createItem(entity) {
    const id = entity.get('id')
    const name = entity.get('name')

    return {
        link: {
            to: externals.has(id) ? externals.get(id) : `/forecasts/${id}`,
            target: externals.has(id) ? name : null,
        },
        name,
    }
}

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    forecastRegions => ({
        items: forecastRegions
            .sortBy(entity => entity.get('name'))
            .map(createItem)
            .toList(),
    })
)

export default compose(
    defaultProps({
        title: 'Forecast regions',
        headline: 'Click on a link below to read the avalanche bulletin.',
    }),
    connect(mapStateToProps, {
        loadFeaturesMetadata,
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadFeaturesMetadata()
        },
    })
)(PageList)
