import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import RelativeHumidity from './charts/RelativeHumidity'
import Snow from './charts/Snow'
import Temperature from './charts/Temperature'
import Wind from './charts/Wind'
import { getDateExtent } from './utils'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error } from 'components/text'
import styles from './Station.css'
import { useRatio } from 'utils/react/hooks'

ChartSet.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function ChartSet({ measurements }) {
    const fallback = <Error>An error happened while showing charts.</Error>
    const [dimensions, ref] = useRatio()
    const { min, max } = getDateExtent(measurements)

    return (
        <ErrorBoundary fallback={fallback}>
            <div ref={ref} className={styles.ChartSet}>
                {dimensions && (
                    <Fragment>
                        <Snow
                            data={measurements}
                            min={min}
                            max={max}
                            width={dimensions.width}
                            height={Math.max(dimensions.height, MIN_HEIGHT)}
                        />
                        <Temperature
                            data={measurements}
                            min={min}
                            max={max}
                            width={dimensions.width}
                            height={Math.max(dimensions.height, MIN_HEIGHT)}
                        />
                        <Wind
                            data={measurements}
                            min={min}
                            max={max}
                            width={dimensions.width}
                            height={Math.max(dimensions.height, MIN_HEIGHT)}
                        />
                        <RelativeHumidity
                            data={measurements}
                            min={min}
                            max={max}
                            width={dimensions.width}
                            height={Math.max(dimensions.height, MIN_HEIGHT)}
                        />
                    </Fragment>
                )}
            </div>
        </ErrorBoundary>
    )
}

// Constants
const MIN_HEIGHT = 200
