import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import HotZoneReport from 'containers/HotZoneReport'
import ArchiveHotZoneReport from 'containers/ArchiveHotZoneReport'
import HotZoneList from './HotZoneList'

HotZoneReportLayout.propTypes = {
    match: PropTypes.object.isRequired,
}

function archive({ match }) {
    return <ArchiveHotZoneReport {...match.params} />
}

function report({ match }) {
    return <HotZoneReport {...match.params} />
}

export default function HotZoneReportLayout({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/archives/:name?/:date?`} render={archive} />
            <Route path={`${path}/:name/:uid?`} render={report} />
            <Route path={path} component={HotZoneList} />
        </Switch>
    )
}
