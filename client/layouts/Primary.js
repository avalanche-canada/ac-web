import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Forecast from 'layouts/drawers/Forecast'
import HotZoneReport from 'layouts/drawers/HotZoneReport'
import NorthRockies from 'layouts/drawers/NorthRockies'
import Drawer, { RIGHT } from 'components/page/drawer'

export default class Primary extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        width: PropTypes.number.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderForecast = ({ match }) => (
        <Forecast
            name={match.params.name}
            onCloseClick={this.props.onCloseClick}
            onLocateClick={this.props.onLocateClick}
        />
    )
    renderHotZoneReport = ({ match }) => (
        <HotZoneReport
            name={match.params.name}
            onCloseClick={this.props.onCloseClick}
            onLocateClick={this.props.onLocateClick}
        />
    )
    renderNorthRockies = () => (
        <NorthRockies
            onCloseClick={this.props.onCloseClick}
            onLocateClick={this.props.onLocateClick}
        />
    )
    render() {
        const { open, width } = this.props

        return (
            <Drawer side={RIGHT} open={open} width={width}>
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
