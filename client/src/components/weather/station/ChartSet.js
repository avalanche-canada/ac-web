import React from 'react'
import PropTypes from 'prop-types'
import {onlyUpdateForKey} from '/compose'
import {List} from 'immutable'
import {VictoryBar, VictoryLine, VictoryChart, VictoryScatter, VictoryGroup, VictoryAxis, VictoryStack, VictoryTheme, VictoryContainer} from 'victory'
import {PRIMARY, SECONDARY} from '/constants/colors'
import RelativeHumidity from './charts/RelativeHumidity'
import Snow from './charts/Snow'
import Temperature from './charts/Temperature'
import Wind from './charts/Wind'
import {getDateExtent} from './utils'
import {Ratio} from '/components/misc'
import styles from './Station.css'

const theme = VictoryTheme.material

ChartSet.propTypes = {
    measurements: PropTypes.instanceOf(List).isRequired,
}

const MIN_HEIGHT = 200

function ChartSet({measurements, width}) {
    const data = measurements.toArray()
    const {min, max} = getDateExtent(data)

    return (
        <Ratio traverse>
            {(width, height) => {
                height = Math.max(MIN_HEIGHT, height)

                return (
                    <div className={styles.ChartSet}>
                        <Snow data={data} min={min} max={max} width={width} height={height} />
                        <Temperature data={data} min={min} max={max} width={width} height={height} />
                        <Wind data={data} min={min} max={max} width={width} height={height} />
                        <RelativeHumidity data={data} min={min} max={max} width={width} height={height} />
                    </div>
                )
            }}
        </Ratio>
    )
}

export default onlyUpdateForKey('measurements')(ChartSet)
