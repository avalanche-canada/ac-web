import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Forecast from 'layouts/drawers/Forecast'
import HotZoneReport from 'layouts/drawers/HotZoneReport'
import NorthRockies from 'layouts/drawers/NorthRockies'
import Drawer, { RIGHT } from 'components/page/drawer'

export default class Primary extends Component {
    static propTypes = {
        opened: PropTypes.bool.isRequired,
        width: PropTypes.number.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    shouldComponentUpdate({ opened, width }) {
        return this.props.opened !== opened || this.props.width !== width
    }
    render() {
        console.warn('render Primary()', this.props)
        const { width, opened, ...events } = this.props

        return (
            <Drawer side={RIGHT} open={opened} width={width}>
                <NorthRockies path="forecasts/north-rockies" {...events} />
                {/* <Router>
                    <Forecast path="forecasts/:name" {...events} />
                    <HotZoneReport path="hot-zone-reports/:name" {...events} />
                </Router> */}
            </Drawer>
        )
    }
}
