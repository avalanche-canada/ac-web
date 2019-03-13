import React from 'react'
import PropTypes from 'prop-types'
import RelativeHumidity from './charts/RelativeHumidity'
import Snow from './charts/Snow'
import Temperature from './charts/Temperature'
import Wind from './charts/Wind'
import { getDateExtent } from './utils'
import { Ratio } from 'components/misc'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error } from 'components/text'
import styles from './Station.css'

ChartSet.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function ChartSet({ measurements }) {
    return (
        <Ratio>
            {(ref, { width, height }) => {
                const { min, max } = getDateExtent(measurements)
                const fallback = (
                    <Error>An error happened while showing charts.</Error>
                )

                height = Math.max(MIN_HEIGHT, height)

                return (
                    <ErrorBoundary fallback={fallback}>
                        <div ref={ref} className={styles.ChartSet}>
                            <Snow
                                data={measurements}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                            <Temperature
                                data={measurements}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                            <Wind
                                data={measurements}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                            <RelativeHumidity
                                data={measurements}
                                min={min}
                                max={max}
                                width={width}
                                height={height}
                            />
                        </div>
                    </ErrorBoundary>
                )
            }}
        </Ratio>
    )
}

// Constants
const MIN_HEIGHT = 200
