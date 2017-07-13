import React from 'react'
import PropTypes from 'prop-types'
import { ArchiveWarning as Base } from '~/components/misc'
import { isHotZoneReportValid } from '~/prismic/utils'

ArchiveWarning.propTypes = {
    report: PropTypes.object,
    previous: PropTypes.string,
    next: PropTypes.string,
}

export default function ArchiveWarning({ report, previous, next }) {
    if (!report || isHotZoneReportValid(report)) {
        return null
    }

    const nowcast = {
        to: `/hot-zone-reports/${report.region}`,
        children: "Read today's report",
    }

    if (previous) {
        previous = {
            to: `/hot-zone-reports/${report.region}/${previous.region}`,
            children: previous.title,
        }
    }

    if (next) {
        next = {
            to: `/hot-zone-reports/${report.region}/${next.region}`,
            children: next.title,
        }
    }

    return (
        <Base nowcast={nowcast} previous={previous} next={next}>
            This is an archived HotZone report
        </Base>
    )
}
