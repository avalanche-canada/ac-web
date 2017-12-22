import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import parseDate from 'date-fns/parse'
import HotZoneReport from 'layouts/pages/HotZoneReport'
import ArchiveHotZoneReport from 'layouts/pages/ArchiveHotZoneReport'
import HotZoneList from './HotZoneList'

HotZoneReportLayout.propTypes = {
    match: PropTypes.object.isRequired,
}
function archive({ match }) {
    let { name, date } = match.params

    if (date) {
        date = parseDate(date)
    }

    return <ArchiveHotZoneReport name={name} date={date} />
}

function report({ match }) {
    const { name, uid } = match.params

    return <HotZoneReport region={name} uid={uid} />
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
