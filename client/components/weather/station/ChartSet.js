import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import RelativeHumidity from './charts/RelativeHumidity'
import Snow from './charts/Snow'
import Temperature from './charts/Temperature'
import Wind from './charts/Wind'
import { getDateExtent } from './utils'
import { Ratio } from 'components/misc'
import styles from './Station.css'

const MIN_HEIGHT = 200

export default class ChartSet extends Component {
    static propTypes = {
        measurements: PropTypes.instanceOf(List).isRequired,
    }
    shouldComponentUpdate({ measurements }) {
        return measurements !== this.props.measurements
    }
    render() {
        const { measurements } = this.props
        const data = measurements.toArray()
        const { min, max } = getDateExtent(data)

        return (
            <Ratio traverse>
                {(width, height) => {
                    height = Math.max(MIN_HEIGHT, height)

                    return (
                        <div className={styles.ChartSet}>
                            <Snow
                                data={data}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                            <Temperature
                                data={data}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                            <Wind
                                data={data}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                            <RelativeHumidity
                                data={data}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                        </div>
                    )
                }}
            </Ratio>
        )
    }
}
