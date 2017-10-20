import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Controls from 'containers/drawers/controls/Map'
import { Primary as Base, Forecast, HotZoneReport } from 'containers/drawers'

Primary.propTypes = {
    open: PropTypes.bool,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default function Primary({ open, location, history }) {
    function handleCloseClick() {
        history.push({
            ...location,
            pathname: '/map',
        })
    }
    function forecast({ match }) {
        const { name } = match.params

        return <Forecast name={name} onCloseClick={handleCloseClick} />
    }
    function hotZoneReport({ match }) {
        const { name } = match.params

        return <HotZoneReport name={name} onCloseClick={handleCloseClick} />
    }

    return (
        <Base open={open}>
            <Controls />
            <Route path="/map/forecasts/:name" render={forecast} />
            <Route path="/map/hot-zone-reports/:name" render={hotZoneReport} />
        </Base>
    )
}
