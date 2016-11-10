import React, {PropTypes} from 'react'
import {onlyUpdateForKey} from 'compose'
import {List} from 'immutable'
import moment from 'moment'
import {VictoryBar, VictoryLine, VictoryChart, VictoryScatter, VictoryGroup, VictoryAxis, VictoryStack, VictoryTheme, VictoryContainer} from 'victory'
import {PRIMARY, SECONDARY} from 'constants/colors'
import RelativeHumidity from './charts/RelativeHumidity'
import SnowHeight from './charts/SnowHeight'
import Temperature from './charts/Temperature'
import Wind from './charts/Wind'
import {getDateExtent} from './utils'
import {Ratio} from 'components/misc'
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
                        <h2>Snow height</h2>
                        <SnowHeight data={data} min={min} max={max} width={width} height={height} />
                        <h2>Air Temperature</h2>
                        <Temperature data={data} min={min} max={max} width={width} height={height} />
                        <h2>Wind speed and direction</h2>
                        <Wind data={data} min={min} max={max} width={width} height={height} />
                        <h2>Relative humidity</h2>
                        <RelativeHumidity data={data} min={min} max={max} width={width} height={height} />
                    </div>
                )
            }}
        </Ratio>
    )
}

export default onlyUpdateForKey('measurements')(ChartSet)
