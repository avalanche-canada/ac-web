import {PropTypes} from 'react'
import {compose, renameProps, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'
import {asTermAndDefinition} from 'components/description/utils'

const {object, number, string} = PropTypes

export default compose(
    setDisplayName('Weather'),
    setPropTypes({
        snowfallRate: number,
        newSnow24Hours: number,
        windDirection: string,
        stormStartDate: string,
        minTemp: number,
        precipitationType: string,
        temperature: number,
        weatherObsComment: string,
        maxTemp: number,
        windSpeed: string,
        rainfallRate: string,
        precipitation24Hours: number,
        skyCondition: string,
        stormSnowAmount: number,
        temperatureTrend: string,
        blowingSnow: string,
        tempLatlng: string,
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
    mapProps(({weatherObsComment, tempLatlng, ...values}) => ({
        comment: weatherObsComment,
        descriptions: asTermAndDefinition(values),
    }))
)(Content)
