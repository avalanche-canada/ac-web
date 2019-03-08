import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import get from 'lodash/get'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import { metadata } from 'api/requests/metadata'
import { Error } from 'components/text'

Region.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Region({ name, children }) {
    const fallback = 'An error happened while retrieving forecast region.'
    function transform(data) {
        return get(data, [FORECAST_REGIONS, name], null)
    }

    return (
        <Features fallback={fallback} transform={transform}>
            {children}
        </Features>
    )
}

Regions.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Regions({ children }) {
    const fallback = 'An error happened while retrieving forecast regions.'
    function transform(data) {
        return data ? extractForecastRegions(data) : data
    }

    return (
        <Features fallback={fallback} transform={transform}>
            {children}
        </Features>
    )
}

HotZone.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function HotZone({ name, children }) {
    const fallback = 'An error happened while retrieving hot zone.'
    function transform(data) {
        return get(data, [HOT_ZONES, name], null)
    }

    return (
        <Features fallback={fallback} transform={transform}>
            {children}
        </Features>
    )
}

HotZones.propTypes = {
    children: PropTypes.func.isRequired,
    all: PropTypes.bool,
}

export function HotZones({ all, children }) {
    const fallback = 'An error happened while retrieving hot zones.'
    function transform(data) {
        return data ? extractHotZones(data)(all) : data
    }

    return (
        <Features fallback={fallback} transform={transform}>
            {children}
        </Features>
    )
}

// Utils
function Features({ fallback, children, transform }) {
    return (
        <ErrorBoundary fallback={<Error>{fallback}</Error>}>
            <Fetch cache={CACHE} request={metadata()}>
                {({ data, ...props }) =>
                    children(
                        Object.assign(props, {
                            data: data ? transform(data) : data,
                        })
                    )
                }
            </Fetch>
        </ErrorBoundary>
    )
}
const CACHE = new Memory()
const FORECAST_REGIONS = 'forecast-regions'
const HOT_ZONES = 'hot-zones'
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
const extractHotZones = memoize(data =>
    memoize(all =>
        Object.values(data[HOT_ZONES])
            .filter(({ id }) => (all ? true : id === 'yukon'))
            .sort(sorter)
    )
)
const extractForecastRegions = memoize(data =>
    Object.values(data[FORECAST_REGIONS]).sort(sorter)
)
