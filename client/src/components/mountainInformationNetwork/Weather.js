import {PropTypes} from 'react'
import {compose, renameProp, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'

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
    renameProp('weatherObsComment', 'comment'),
    mapProps(props => {
        delete props.tempLatlng

        return props
    })
)(Content)
