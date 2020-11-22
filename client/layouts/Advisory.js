import React, { lazy } from 'react'
import { Router } from '@reach/router'
import parse from 'date-fns/parse'
import Bundle from 'components/Bundle'

export default function HotZoneReportLayout() {
    return (
        <Router>
            <ArchiveAdvisoryRoute path="archives" />
            <ArchiveAdvisoryRoute path="archives/:name" />
            <ArchiveAdvisoryRoute path="archives/:name/:date" />
        </Router>
    )
}

const ArchiveAdvisory = lazy(() => import('layouts/pages/ArchiveAdvisory'))

function ArchiveAdvisoryRoute({ name, date }) {
    if (date) {
        date = parse(date)
    }

    return (
        <Bundle>
            <ArchiveAdvisory name={name} date={date} />
        </Bundle>
    )
}
