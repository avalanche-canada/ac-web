import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../TripPlanner.css'
import { Close } from 'components/button'
import Device from 'components/Device'

export default class Welcome extends PureComponent {
    static propTypes = {
        closable: PropTypes.bool,
    }
    state = {
        visible: true,
    }
    handleCloseClick = () => {
        this.setState({ visible: false })
    }
    get close() {
        return this.props.closable && <Close onClick={this.handleCloseClick} />
    }
    renderAction = ({ isTouchable }) =>
        isTouchable ? 'Tap on a ATES area.' : 'Click on a ATES area.'
    render() {
        if (!this.state.visible) {
            return null
        }

        return (
            <div className={styles.Welcome}>
                <header>
                    <h1>Welcome to the Trip planner</h1>
                    {this.close}
                </header>
                <p>
                    <Device>{this.renderAction}</Device>
                </p>
                <p>If you do not see any ATES area, please zoom in.</p>
            </div>
        )
    }
}
