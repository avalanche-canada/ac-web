import React from 'react'
import PropTypes from 'prop-types'
import { ArchiveWarning as Base } from 'components/misc'

ArchiveWarning.propTypes = {
    region: PropTypes.string,
}

export default function ArchiveWarning({ region }) {
    const nowcast = {
        to: `/hot-zone-reports/${region}`,
        children: "Read today's report",
    }

    return <Base nowcast={nowcast}>This is an archived HotZone report</Base>
}
