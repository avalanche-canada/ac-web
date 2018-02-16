import React, { PureComponent } from 'react'
import styles from '../TripPlanner.css'
import Panel, { INVERSE } from 'components/panel'

export default class TripPlannerPanel extends PureComponent {
    state = {
        expanded: this.props.expanded || false,
    }
    handleExpandedChange = expanded => this.setState({ expanded })
    render() {
        const { children, ...props } = this.props
        const { expanded } = this.state

        return (
            <Panel
                {...props}
                onExpandedChange={this.handleExpandedChange}
                expanded={expanded}
                expandable
                theme={INVERSE}>
                <div className={styles.Panel}>{children}</div>
            </Panel>
        )
    }
}
