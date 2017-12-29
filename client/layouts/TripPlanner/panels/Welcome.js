import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../TripPlanner.css'
import { Close } from 'components/button'

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
                    Click or tap on the map to place a pin. If you want to start
                    planning your trip, the pin needs to be dropped inside an
                    Avalanche Terrain Exposure Scale (ATES) area as well as
                    inside a forecast region.
                </p>
                <p>If you do not see any ATES area, please zoom in.</p>
            </div>
        )
    }
}
