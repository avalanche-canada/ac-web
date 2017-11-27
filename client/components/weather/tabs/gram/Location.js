import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Fullscreen from 'components/Fullscreen'
import styles from './Gram.css'

export default class Location extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
    }
    state = {
        target: null,
    }
    setTarget = target => this.setState({ target })
    renderer = ({ enter }) => {
        const { children: [header, image] } = this.props

        return (
            <section className={styles.Location} onClick={enter}>
                {header}
                {cloneElement(image, { ref: this.setTarget })}
            </section>
        )
    }
    render() {
        return (
            <Fullscreen target={this.state.target}>{this.renderer}</Fullscreen>
        )
    }
}
