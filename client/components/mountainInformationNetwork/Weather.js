import PropTypes from 'prop-types'
import {
    compose,
    renameProps,
    setDisplayName,
    setPropTypes,
    mapProps,
} from 'recompose'
import Content from './Content'
import { asTermAndDefinition } from '~/components/description/utils'

export default compose(
    setDisplayName('Weather'),
    setPropTypes({
        snowfallRate: PropTypes.number,
        newSnow24Hours: PropTypes.number,
        windDirection: PropTypes.string,
        stormStartDate: PropTypes.string,
        minTemp: PropTypes.number,
        precipitationType: PropTypes.string,
        temperature: PropTypes.number,
        weatherObsComment: PropTypes.string,
        maxTemp: PropTypes.number,
        windSpeed: PropTypes.string,
        rainfallRate: PropTypes.string,
        precipitation24Hours: PropTypes.number,
        skyCondition: PropTypes.string,
        stormSnowAmount: PropTypes.number,
        temperatureTrend: PropTypes.string,
        blowingSnow: PropTypes.string,
        tempLatlng: PropTypes.string,
    }),
    renameProps({
        skyCondition: 'Cloud cover',
        precipitationType: 'Precipitation type',
        snowfallRate: 'Snowfall rate (cm/hour)',
        rainfallRate: 'Rainfall rate',
        temperature: 'Temperature at time of observation (deg C)',
        minTemp: 'Minimum temperature in last 24 hours (deg C)',
        maxTemp: 'Maximum temperature in last 24 hours (deg C)',
        temperatureTrend: 'Temperature trend',
        newSnow24Hours: 'Amount of new snow in last 24 hours (cm)',
        precipitation24Hours: 'Total rain and snow combined in last 24 hours (mm)',
        stormSnowAmount: 'Total snow from the most recent storm (cm)',
        stormStartDate: 'Storm start date',
        windSpeed: 'Wind speed',
        windDirection: 'Wind direction',
        blowingSnow: 'Blowing snow',
    }),
    mapProps(({ weatherObsComment, tempLatlng, ...values }) => ({
        comment: weatherObsComment,
        descriptions: asTermAndDefinition(values),
    }))
)(Content)
