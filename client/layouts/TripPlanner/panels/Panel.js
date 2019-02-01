import React, { useState } from 'react'
import styles from '../TripPlanner.css'
import Panel, { INVERSE } from 'components/panel'

// TODO Not sure we need that component anymore

export default function TripPlannerPanel({
    expanded = false,
    children,
    ...props
}) {
    const [managedExpanded, set] = useState(expanded)

    return (
        <Panel
            {...props}
            onExpandedChange={set}
            expanded={managedExpanded}
            expandable
            theme={INVERSE}>
            <div className={styles.Panel}>{children}</div>
        </Panel>
    )
}
