import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../TripPlanner.css'
import { Close } from 'components/button'
import Device from 'components/Device'
import { SIMPLE, CHALLENGING, COMPLEX, Palette } from 'constants/forecast/ates'

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
    renderAction = ({ isTouchable }) => (
        <p>
            {isTouchable ? 'Tap' : 'Click'} on a ATES area to start your trip
            planning.
        </p>
    )
    getStyle(rating) {
        return {
            color: Palette.get(rating),
            fontWeight: 'bold',
        }
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
                    ATES areas are colored:
                    <ul>
                        <li style={this.getStyle(SIMPLE)}>
                            green for simple terrain
                        </li>
                        <li style={this.getStyle(CHALLENGING)}>
                            blue for challenging terrain
                        </li>
                        <li style={this.getStyle(COMPLEX)}>
                            black for complex terrain
                        </li>
                    </ul>
                </p>
                <Device>{this.renderAction}</Device>
                <p>
                    If you do not see any ATES areas, please zoom in or click on
                    a grey zone to have the map zoomed in automatically.
                </p>
            </div>
        )
    }
}
