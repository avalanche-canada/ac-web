import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import parse from 'date-fns/parse'
import List, { Entry } from './List'
import Comment from './Comment'

Weather.propTypes = {
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

function Weather({
    skyCondition,
    precipitationType,
    snowfallRate,
    rainfallRate,
    temperature,
    minTemp,
    maxTemp,
    temperatureTrend,
    newSnow24Hours,
    precipitation24Hours,
    stormSnowAmount,
    stormStartDate,
    windSpeed,
    windDirection,
    blowingSnow,
    weatherObsComment,
}) {
    return (
        <Fragment>
            <List>
                <Entry term="Cloud cover">{skyCondition}</Entry>
                <Entry term="Precipitation type">{precipitationType}</Entry>
                <Entry term="Snowfall rate (cm/hour)">{snowfallRate}</Entry>
                <Entry term="Rainfall rate">{rainfallRate}</Entry>
                <Entry term="Temperature at time of observation (deg C)">
                    {temperature}
                </Entry>
                <Entry term="Minimum temperature in last 24 hours (deg C)">
                    {minTemp}
                </Entry>
                <Entry term="Maximum temperature in last 24 hours (deg C)">
                    {maxTemp}
                </Entry>
                <Entry term="Temperature trend">{temperatureTrend}</Entry>
                <Entry term="Amount of new snow in last 24 hours (cm)">
                    {newSnow24Hours}
                </Entry>
                <Entry term="Total rain and snow combined in last 24 hours (mm)">
                    {precipitation24Hours}
                </Entry>
                <Entry term="Total snow from the most recent storm (cm)">
                    {stormSnowAmount}
                </Entry>
                <Entry term="Storm start date">
                    {stormStartDate && parse(stormStartDate)}
                </Entry>
                <Entry term="Wind speed">{windSpeed}</Entry>
                <Entry term="Wind direction">{windDirection}</Entry>
                <Entry term="Blowing snow">{blowingSnow}</Entry>
            </List>
            <Comment>{weatherObsComment}</Comment>
        </Fragment>
    )
}

export default memo(Weather)
