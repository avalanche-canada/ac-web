import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Panel from './Panel'
import styles from '../TripPlanner.css'

export default class OptionsPanel extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    render() {
        return (
            <Panel header="Options">
                <div className={styles.PanelContent}>{this.props.children}</div>
            </Panel>
        )
    }
}
