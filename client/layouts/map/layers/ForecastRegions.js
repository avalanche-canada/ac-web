import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Layer from 'components/map/Layer'
import { FORECASTS as key } from 'constants/drawers'

export default class ForecastRegions extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        activeId: PropTypes.string,
    }
    render() {
        const { visible, activeId } = this.props
        const activeFilter = activeId ? ['==', 'id', activeId] : []
        const activeVisible = visible && Boolean(activeId)

        return (
            <Fragment>
                <Layer.Fill
                    id={key}
                    sourceLayer="Forecast_Regions"
                    {...styles.base}
                />
                <Layer.Fill
                    id={`${key}-active`}
                    sourceLayer="Forecast_Regions"
                    {...styles.active}
                />
                <Layer.Line
                    id={`${key}-contour`}
                    visible={activeVisible}
                    filter={activeFilter}
                    sourceLayer="Forecast_Regions"
                    {...styles.contour}
                />
                <Layer.Line
                    id={`${key}-active-contour`}
                    visible={activeVisible}
                    filter={activeFilter}
                    sourceLayer="Forecast_Regions"
                    {...styles.activeContour}
                />
                <Layer.Symbol
                    id={`${key}-labels`}
                    visible={activeVisible}
                    sourceLayer="Forecast_Regions"
                    {...styles.labels}
                />
            </Fragment>
        )
    }
}

// Utils
const styles = {
    base: {
        paint: {
            'fill-color': '#C8D3D9',
            'fill-opacity': { base: 1, stops: [[3, 1], [8, 0]] },
        },
    },
    contour: {
        paint: {
            'line-color': '#B43A7E',
            'line-width': 1.5,
        },
    },
    active: {
        paint: {
            'fill-color': '#489BDF',
            'fill-opacity': { base: 1, stops: [[3, 1], [8, 0]] },
        },
    },
    activeContour: {
        paint: {
            'line-color': '#B43A7E',
            'line-width': 4,
        },
    },
    labels: {
        layout: {
            'text-field': '{name}',
            'text-size': 12,
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'hsl(0, 0%, 100%)',
            'text-halo-width': 1,
        },
    },
}
