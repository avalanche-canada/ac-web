import React from 'react'
import { useReport } from './Context'
import Shim from 'components/Shim'
import * as utils from 'utils/hzr'
import { Warning } from 'components/alert'

export default function ArchiveWarning() {
    const report = useReport()

    if (!report || utils.isValid(report.data)) {
        return null
    }

    return (
        <Shim vertical>
            <Warning>This is an archived Avalanche Advisory.</Warning>
        </Shim>
    )
}
