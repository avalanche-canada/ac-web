import React, { PropTypes, Component, Children, cloneElement } from 'react'
import { compose, withState } from 'recompose'
import CSSModules from 'react-css-modules'
import keycode from 'keycode'
import Option from './Option'
import Holder from './Holder'
import styles from './Dropdown.css'

function K() {}

const scrollStopperKeyCodes = new Set([keycode.codes.up, keycode.codes.down])

@CSSModules(styles)
export default class Dropdown extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(Option).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        placeholder: PropTypes.string,
    }
    static defaultProps = {
        onChange: K,
        placeholder: 'Select',
    }
    state = {
        open: false,
        label: null,
        active: 0,
    }
    get open() {
        return this.state.open
    }
    set open(open) {
        this.setState({open})
    }
    get active() {
        return this.state.active
    }
    set active(active) {
        const count = Children.count(this.props.children)

        if (active === -1) {
            active = count - 1
        } else if (active === count) {
            active = 0
        }

        this.setState({active})
    }
    get value() {
        const {value, children} = this.props
        const options = Children.toArray(children)
        const option = options.find(option => option.props.value === value)

        return option && option.props.children
    }
    close(callback = K) {
        this.setState({
            open: true
        }, callback)
    }
    valueAt(index) {
        const options = Children.toArray(this.props.children)

        return options[index].props.value
    }
    indexOf(value) {
        if (!value) {
            return 0
        }

        const options = Children.toArray(this.props.children)
        const option = options.find(option => option.props.value === value)

        return options.indexOf(option)
    }
    handleClick = event => {
        this.open = !this.open
    }
    handleKeyDown = event => {
        const {keyCode} = event

        if (scrollStopperKeyCodes.has(keyCode)) {
            event.preventDefault()
        }
    }
    handleKeyUp = event => {
        const {keyCode} = event

        switch (keyCode) {
            case keycode.codes.esc:
                this.open = false
                break
            case keycode.codes.down:
                if (this.open) {
                    this.active = this.active + 1
                } else {
                    this.open = true
                }
                break
            case keycode.codes.up:
                if (this.open) {
                    this.active = this.active - 1
                } else {
                    this.open = true
                }
                break
            case keycode.codes.enter:
                this.open = false
                this.props.onChange(this.valueAt(this.active))
                break
            case keycode.codes.space:
                this.open = !this.open
                break
        }
    }
    handleFocus = ({target}) => {
        target.addEventListener('keyup', this.handleKeyUp)
        target.addEventListener('keydown', this.handleKeyDown)
        this.target = target
    }
    handleBlur = ({target}) => {
        target.removeEventListener('keyup', this.handleKeyUp)
        target.removeEventListener('keydown', this.handleKeyDown)

        // SHAME
        setTimeout(() => {
            this.open = false
        }, 100)
    }
    render() {
        const {open, active} = this
        const {onChange, placeholder, children, value} = this.props
        const styleName = open ? 'Input--Open' : 'Input'

        return (
            <div styleName='Container' onClick={this.handleClick}>
                <div styleName={styleName} tabIndex={0} onFocus={this.handleFocus} onBlur={this.handleBlur} >
                    <Holder value={this.value} placeholder={placeholder} />
                </div>
                {open &&
                    <div styleName='OptionSet'>
                        {Children.map(children, (option, index) => (
                            cloneElement(option, {
                                active: value === option.props.value,
                                onClick: event => {
                                    this.close(() => onChange(option.props.value))
                                },
                            })
                        ))}
                    </div>
                }
            </div>
        )
    }
}
