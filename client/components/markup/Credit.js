import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { Toggle } from 'react-powerplug'
import classnames from 'classnames/bind'
import Dimensions from 'components/Dimensions'
import styles from './Credit.css'

export default class Credit extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
        compact: PropTypes.bool,
        top: PropTypes.bool,
    }
    static Managed = class Managed extends PureComponent {
        renderContent = ({ width }) =>
            createElement(Credit, {
                ...this.props,
                compact: width < MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT,
            })
        render() {
            return <Dimensions>{this.renderContent}</Dimensions>
        }
    }
    classnames = classnames.bind(styles)
    renderContent = ({ on, toggle }) => {
        const { top, compact } = this.props
        const className = this.classnames({
            Credit: true,
            Compact: compact,
            Expanded: on,
            Top: top,
        })

        return (
            <span data-label="Credit" className={className} onClick={toggle}>
                {this.props.children}
            </span>
        )
    }
    render() {
        return <Toggle>{this.renderContent}</Toggle>
    }
}

// Constants
const MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT = 250
