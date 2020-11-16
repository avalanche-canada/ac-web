import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import RelativeHumidity from './charts/RelativeHumidity'
import Snow from './charts/Snow'
import Temperature from './charts/Temperature'
import Wind from './charts/Wind'
import { getDateExtent } from './utils'
import { Boundary as ErrorBoundary } from 'components/error'
import { Error } from 'components/text'
import styles from './Station.module.css'
import { useRatio } from 'hooks'

ChartSet.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function ChartSet({ measurements }) {
    const fallback = (
        <Error>
            <FormattedMessage
                description="Component weather/station/ChartSet"
                defaultMessage="An error happened while showing charts."
            />
        </Error>
    )
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
