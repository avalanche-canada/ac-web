import Weather, {Forecast as ForecastComponent, Tutorial as TutorialComponent} from 'components/page/weather'
import {compose, withHandlers, withProps} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import getWeather from 'selectors/prismic/weather'
import {weatherForecast} from 'containers/connectors'
import {formatAsDay, parseFromDay} from 'utils/date'

export default compose(
    connect(getWeather)
)(Weather)

export const Forecast = compose(
    withRouter,
    withProps(props => {
        const {date} = props.params

        return {
            date: date ? parseFromDay(date) : new Date()
        }
    }),
    weatherForecast,
    withHandlers({
        onDayChange: props => date => {
            props.router.push(`/weather/forecast/${formatAsDay(date)}`)
        }
    }),
)(ForecastComponent)
