import React from 'react'
import Panel from 'components/panel'
import styles from '../TripPlanner.module.css'

// TODO Not sure we need that component anymore

export default function TripPlannerPanel({ expanded = false, children, ...props }) {
    return (
        <Panel {...props} expanded={expanded}>
            <div className={styles.Panel}>{children}</div>
        </Panel>
    )
}
