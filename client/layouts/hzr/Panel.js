import React from 'react'
import Panel, { INVERSE } from 'components/panel'
import Shim from 'components/Shim'

export default function InversePanel({ children, ...props }) {
    return (
        <Panel {...props} expandable theme={INVERSE}>
            <Shim horizontal>{children}</Shim>
        </Panel>
    )
}
