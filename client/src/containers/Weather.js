import Weather, {Forecast as ForecastComponent, Tutorial as TutorialComponent} from 'components/page/weather'
import {compose, withHandlers, withProps} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import getWeather from 'selectors/prismic/weather'
import {weatherForecast, weatherTutorial} from 'containers/connectors'
import parse from 'date-fns/parse'
import format from 'date-fns/format'

export default compose(
    connect(getWeather)
)(Weather)

export const Forecast = compose(
    withRouter,
    withProps(props => {
        const {date} = props.params

        return {
            date: date ? parse(date) : new Date()
        }
    }),
    weatherForecast,
    withHandlers({
        onDayChange: props => date => {
            props.router.push(`/weather/forecast/${format(date, 'YYYY-MM-DD')}`)
        }
    }),
)(ForecastComponent)
