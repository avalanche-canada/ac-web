import {connect} from 'react-redux'
import {compose, lifecycle, setPropTypes, withState, withProps} from 'recompose'
import getForecast from 'selectors/forecast'
import {loadForecast} from 'actions/entities'

export default compose(
    connect(getForecast, {loadForecast}),
    withState('isError', 'setIsError', false),
    withProps(({loadForecast, setIsError}) => ({
        load(params) {
            loadForecast(params).catch(err => setIsError(true))
        },
    })),
    lifecycle({
        componentDidMount() {
            const {load, params} = this.props

            load(params)
        },
        componentWillReceiveProps({load, params}) {
            load(params)
        },
    }),
)
