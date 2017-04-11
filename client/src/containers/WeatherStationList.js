import {compose, lifecycle, defaultProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {WeatherStation} from '/api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {loadWeatherStations} from 'actions/entities'
import {PageList} from '/components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, WeatherStation),
    stations => ({
        items: stations.sortBy(
            station => station.get('name')
        ).map(
            station => ({
                link: `/weather/stations/${station.get('stationId')}`,
                name: station.get('name'),
            })
        ).toList(),
    })
)

export default compose(
    defaultProps({
        title: 'Weather Stations',
        headline: 'Click on a link below to see weather station data.',
    }),
    connect(mapStateToProps, {
        loadWeatherStations
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadWeatherStations()
        },
    }),
)(PageList)
