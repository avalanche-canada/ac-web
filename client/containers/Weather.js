import { compose, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import withRouter from 'react-router/lib/withRouter'
import parseDate from 'date-fns/parse'
import { parse } from '~/prismic'
import format from 'date-fns/format'
import Weather, {
    Forecast as ForecastComponent,
} from '~/components/page/weather'
import getWeather from '~/selectors/prismic/weather'
import { weatherForecast } from '~/containers/connectors'

export default compose(connect(getWeather))(Weather)

export const Forecast = compose(
    withRouter,
    withProps(props => {
        const { date } = props.params

        return {
            date: date ? parseDate(date) : new Date(),
        }
    }),
    weatherForecast,
    withHandlers({
        onDayChange: props => date => {
            props.router.push(`/weather/forecast/${format(date, 'YYYY-MM-DD')}`)
        },
    }),
    withProps(({ forecast }) => ({
        forecast: parse(forecast).data,
    }))
)(ForecastComponent)
