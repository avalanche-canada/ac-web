import React from 'react'
import { useReport } from './Context'
import Shim from 'components/Shim'
import * as utils from 'utils/advisory'
import { Warning } from 'components/alert'
import { FormattedMessage } from 'react-intl'

export default function ArchiveWarning() {
    const report = useReport()

    if (!report || utils.isValid(report.data)) {
        return null
    }

    return (
        <Shim vertical>
            <Warning>
                <FormattedMessage
                    description="Layout products/advisory/ArchiveWarning"
                    defaultMessage="This is an archived Avalanche Advisory."
                />
            </Warning>
        </Shim>
    )
}
