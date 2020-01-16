import React, { lazy } from 'react'
import { Router } from '@reach/router'
import parse from 'date-fns/parse'
import Bundle from 'components/Bundle'
import HotZoneReport from 'layouts/pages/HotZoneReport'
import HotZoneList from './HotZoneList'

export default function HotZoneReportLayout() {
    return (
        <Router>
            <ArchiveHotZoneReportRoute path="archives" />
            <ArchiveHotZoneReportRoute path="archives/:name" />
            <ArchiveHotZoneReportRoute path="archives/:name/:date" />
            <HotZoneReport path=":region" />
            <HotZoneReport path=":region/:uid" />
            <HotZoneList default />
        </Router>
    )
}

const ArchiveHotZoneReport = lazy(() =>
    import('layouts/pages/ArchiveHotZoneReport')
)

function ArchiveHotZoneReportRoute({ name, date }) {
    if (date) {
        date = parse(date)
    }

    return (
        <Bundle>
            <ArchiveHotZoneReport name={name} date={date} />
        </Bundle>
    )
}
