import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Primary as Base, Forecast, HotZoneReport } from 'containers/drawers'
import externals from 'router/externals'

Primary.propTypes = {
    open: PropTypes.bool,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default class Primary extends PureComponent {
    get match() {
        return this.props.match
    }
    get name() {
        return this.match ? this.match.params.name : null
    }
    get type() {
        return this.match ? this.match.params.type : null
    }
    tryOpenExternal() {
        const { type, name } = this

        if (type === 'forecasts' && externals.has(name)) {
            window.open(externals.get(name), name)
        }
    }
    handleCloseClick = () => {
        this.props.history.push({
            ...this.props.location,
            pathname: '/map',
        })
    }
    renderForecast = () => (
        <Forecast name={this.name} onCloseClick={this.handleCloseClick} />
    )
    renderHotZoneReport = () => (
        <HotZoneReport name={this.name} onCloseClick={this.handleCloseClick} />
    )
    componentDidMount() {
        this.tryOpenExternal()
    }
    componentDidUpdate() {
        this.tryOpenExternal()
    }
    render() {
        const open = Boolean(this.match) && !externals.has(this.name)

        return (
            <Base open={open}>
                <Route
                    path="/map/forecasts/:name"
                    render={this.renderForecast}
                />
                <Route
                    path="/map/hot-zone-reports/:name"
                    render={this.renderHotZoneReport}
                />
            </Base>
        )
    }
}
