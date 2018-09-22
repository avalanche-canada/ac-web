import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Forecast from 'layouts/drawers/Forecast'
import HotZoneReport from 'layouts/drawers/HotZoneReport'
import NorthRockies from 'layouts/drawers/NorthRockies'
import Drawer, { RIGHT } from 'components/page/drawer'
import externals from 'router/externals'

export default class Primary extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        navigate: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    handleClose = () => {
        const { navigate, location } = this.props

        navigate(location.search)
    }
    get opened() {
        const { match } = this.props

        if (match) {
            const { name, type } = match

            return (
                typeof type === 'string' &&
                typeof name === 'string' &&
                !externals.has(name)
            )
        }

        return false
    }
    render() {
        const { onLocateClick, width } = this.props

        return (
            <Drawer side={RIGHT} open={this.opened} width={width}>
                <Router>
                    <NorthRockies
                        path="forecasts/north-rockies"
                        onCloseClick={this.handleClose}
                        onLocateClick={onLocateClick}
                    />
                    <Forecast
                        path="forecasts/:name"
                        onCloseClick={this.handleClose}
                        onLocateClick={onLocateClick}
                    />
                    <HotZoneReport
                        path="hot-zone-reports/:name"
                        onCloseClick={this.handleClose}
                        onLocateClick={onLocateClick}
                    />
                </Router>
            </Drawer>
        )
    }
}
