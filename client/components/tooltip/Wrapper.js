import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'react-overlays/lib/Overlay'
import Tooltip from './Tooltip'
import styles from './Tooltip.css'

// TODO: HOOKS

export default class Wrapper extends Component {
    static propTypes = {
        placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
        children: PropTypes.node.isRequired,
        tooltip: PropTypes.node.isRequired,
        trigger: PropTypes.oneOf(['hover', 'click']),
    }
    static defaultProps = {
        placement: 'top',
        trigger: 'hover',
    }
    state = {
        visible: false,
    }
    get events() {
        switch (this.props.trigger) {
            case 'hover':
                return {
                    onMouseOver: this.show,
                    onMouseOut: this.hide,
                }
            case 'click':
                return {
                    onClick: this.toggle,
                }
        }
    }
    get visible() {
        return this.state.visible
    }
    set visible(visible) {
        this.setState({ visible })
    }
    show = () => (this.visible = true)
    hide = () => (this.visible = false)
    toggle = () => (this.visible = !this.visible)
    ref = target => (this.target = target)
    render() {
        const { children, placement, tooltip, trigger, ...props } = this.props

        return (
            <div className={styles.Wrapper}>
                {cloneElement(children, {
                    ref: this.ref,
                    ...this.events,
                })}
                <Overlay
                    show={this.visible}
                    container={document.body}
                    target={this.target}
                    placement={placement}>
                    <Tooltip placement={placement} {...props}>
                        {tooltip}
                    </Tooltip>
                </Overlay>
            </div>
        )
    }
}
