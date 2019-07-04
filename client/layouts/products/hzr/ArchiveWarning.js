import React from 'react'
import { Consumer } from './Context'
import Base from '../ArchiveWarning'
import Shim from 'components/Shim'
import * as utils from 'utils/hzr'

export default function ArchiveWarning() {
    return (
        <Consumer>
            {report => {
                if (!report || utils.isValid(report.data)) {
                    return null
                }

                const nowcast = {
                    to: `/advisories/${report.data.region}`,
                    children: "Read today's advisory",
                }

                return (
                    <Shim vertical>
                        <Base nowcast={nowcast}>
                            This is an archived Avalanche Advisory
                        </Base>
                    </Shim>
                )
            }}
        </Consumer>
    )
}
