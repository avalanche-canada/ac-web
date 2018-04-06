import React from 'react'
import Base, { INVERSE } from 'components/panel'

export default function Panel({ children, ...props }) {
    return (
        <Base {...props} theme={INVERSE} expandable>
            {children}
        </Base>
    )
}
