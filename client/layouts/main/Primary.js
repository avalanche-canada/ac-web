import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Forecast from 'layouts/drawers/Forecast'
import HotZoneReport from 'layouts/drawers/HotZoneReport'
import NorthRockies from 'layouts/drawers/NorthRockies'
import Drawer, { RIGHT } from 'components/page/drawer'
import externals from 'router/externals'

export default class Primary extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    handleClose = () => {
        this.props.history.push({
            ...this.props.location,
            pathname: '/map',
        })
    }
    renderForecast = ({ match }) => (
        <Forecast
            name={match.params.name}
            onCloseClick={this.handleClose}
            onLocateClick={this.props.onLocateClick}
        />
    )
    renderHotZoneReport = ({ match }) => (
        <HotZoneReport
            name={match.params.name}
            onCloseClick={this.handleClose}
            onLocateClick={this.props.onLocateClick}
        />
    )
    renderNorthRockies = () => (
        <NorthRockies
            onCloseClick={this.handleClose}
            onLocateClick={this.props.onLocateClick}
        />
    )
    get opened() {
        const { match } = this.props

        if (match) {
            const { name, type } = match.params

            return (
                typeof type === 'string' &&
                typeof name === 'string' &&
                !externals.has(name)
            )
        }

        return false
    }
    render() {
        return (
            <Drawer side={RIGHT} open={this.opened} width={this.props.width}>
                <Switch>
                    <Route
                        path="/map/forecasts/north-rockies"
                        render={this.renderNorthRockies}
                    />
                    <Route
                        path="/map/forecasts/:name"
                        render={this.renderForecast}
                    />
                    <Route
                        path="/map/hot-zone-reports/:name"
                        render={this.renderHotZoneReport}
                    />
                </Switch>
            </Drawer>
        )
    }
}
