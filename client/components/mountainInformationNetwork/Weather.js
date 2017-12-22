import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Content from './Content'
import { asTermAndDefinition } from 'components/description/utils'

export default class Weather extends PureComponent {
    static propTypes = {
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
    }
    render() {
        const { weatherObsComment, tempLatlng, ...values } = this.props

        return (
            <Content
                comment={weatherObsComment}
                descriptions={asTermAndDefinition(values, TERMS)}
            />
        )
    }
}

const TERMS = {
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
}
