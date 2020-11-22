import React, { lazy } from 'react'
import { Redirect, Router } from '@reach/router'
import Bundle from 'components/Bundle'
import { DateParam } from 'hooks/params'

export default function HotZoneReportLayout() {
    return (
        <Router>
            <ArchiveAdvisoryRoute path="archives" />
            <ArchiveAdvisoryRoute path="archives/:name" />
            <ArchiveAdvisoryRoute path="archives/:name/:date" />
            <Redirect from="/*" to="/advisories/archives" />
        </Router>
    )
}

const ArchiveAdvisory = lazy(() => import('layouts/pages/ArchiveAdvisory'))

function ArchiveAdvisoryRoute({ name, date }) {
    if (date) {
        date = DateParam.parse(date)
    }

    return (
        <Bundle>
            <ArchiveAdvisory name={name} date={date} />
        </Bundle>
    )
}
