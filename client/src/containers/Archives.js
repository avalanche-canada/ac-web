import moment from 'moment'
import {compose, withHandlers, withState, lifecycle, withProps} from 'recompose'
import {connect} from 'react-redux'
import Page from 'components/page/Archives'
import {loadForecastRegions} from 'actions/entities'
import mapStateToProps from 'selectors/archives'

const date = moment().subtract(1, 'day').toDate()
function createLink({region, date}) {
    return date && region && `/forecasts/${region}/archives/${moment(date).format('YYYY-MM-DD')}`
}

export default compose(
    connect(mapStateToProps, {
        load: loadForecastRegions
    }),
    lifecycle({
        componentDidMount() {
            this.props.load()
        },
    }),
    withState('date', 'onDateChange', date),
    withState('region', 'onRegionChange'),
    withProps(props => ({
        link: createLink(props)
    })),
)(Page)
