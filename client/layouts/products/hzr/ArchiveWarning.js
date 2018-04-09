import React from 'react'
import { Consumer } from './Context'
import { ArchiveWarning as Base } from 'components/misc'
import { isValid } from 'utils/hzr'

export default function ArchiveWarning() {
    return (
        <Consumer>
            {report => {
                if (!report || isValid(report.data)) {
                    return null
                }

                const nowcast = {
                    to: `/hot-zone-reports/${report.data.region}`,
                    children: "Read today's report",
                }

                return (
                    <Base nowcast={nowcast}>
                        This is an archived HotZone report
                    </Base>
                )
            }}
        </Consumer>
    )
}
