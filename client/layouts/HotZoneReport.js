import React from 'react'
import { Router } from '@reach/router'
import parse from 'date-fns/parse'
import HotZoneReport from 'layouts/pages/HotZoneReport'
import ArchiveHotZoneReport from 'layouts/pages/ArchiveHotZoneReport'
import HotZoneList from './HotZoneList'

export default function HotZoneReportLayout() {
    return (
        <Router>
            <ArchiveHotZoneReport path="archives" />
            <ArchiveHotZoneReport path="archives/:name" />
            <ArchiveHotZoneReportWithDate path="archives/:name/:date" />
            <HotZoneReport path=":region" />
            <HotZoneReport path=":region/:uid" />
            <HotZoneList default />
        </Router>
    )
}

function ArchiveHotZoneReportWithDate({ name, date }) {
    return <ArchiveHotZoneReport name={name} date={parse(date)} />
}
