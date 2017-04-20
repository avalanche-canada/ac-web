import React, {PureComponent, Children} from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import keycode from 'keycode'
import Holder from '../Holder'
import {OptionSet, Option} from '~/components/controls/options'
import styles from './Dropdown.css'
import noop from 'lodash/noop'

const scrollStopperKeyCodes = new Set([keycode.codes.up, keycode.codes.down])

@CSSModules(styles)
export default class Dropdown extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(Option).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Set)]),
        placeholder: PropTypes.string,
        multiple: PropTypes.bool,
    }
    static defaultProps = {
        onChange: noop,
        placeholder: 'Select',
    }
    state = {
        isOpen: false,
        label: null,
        active: 0,
        value: new Set(),
    }
    constructor(props) {
        super(props)

        const {value} = props

        /* eslint-disable react/no-direct-mutation-state */
        this.state.value = value instanceof Set ? value : new Set([value])
        /* eslint-disable react/no-direct-mutation-state */
    }
    get isOpen() {
        return this.state.isOpen
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
    get holder() {
        const {value} = this.state
        const children = Children.toArray(this.props.children)
        const options = children.filter(option => value.has(option.props.value))

        return options.map(option => option.props.children).join(', ')
    }
    close = callback => {
        this.setState({isOpen: false}, callback)
    }
    open = callback => {
        this.setState({isOpen: true}, callback)
    }
    toggle = callback => {
        this.setState({isOpen: !this.isOpen}, callback)
    }
    valueAt(index) {
        const options = Children.toArray(this.props.children)

        return options[index].props.value
    }
    handleClick = () => {
        this.toggle()
    }
    handleKeyDown = event => {
        if (scrollStopperKeyCodes.has(event.keyCode)) {
            event.preventDefault()
        }
    }
    handleKeyUp = event => {
        switch (event.keyCode) {
        case keycode.codes.esc:
            this.close()
            break
        case keycode.codes.down:
            if (this.isOpen) {
                this.active = this.active + 1
            } else {
                this.open()
            }
            break
        case keycode.codes.up:
            if (this.isOpen) {
                this.active = this.active - 1
            } else {
                this.open()
            }
            break
        case keycode.codes.enter:
            this.close()
            this.props.onChange(this.valueAt(this.active))
            break
        case keycode.codes.space:
            this.toggle()
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

        // SHAME: Needs to be fixed
        setTimeout(this.close, 100)
    }
    handleOptionClick = option => {
        const {onChange, value} = this.props

        if (value instanceof Set) {
            if (value.has(option)) {
                value.delete(option)
            } else {
                value.add(option)
            }

            option = new Set([...value])
        } else if (option === value) {
            option = null
        }

        this.close(() => onChange(option))
    }
    componentWillReceiveProps({value}) {
        if (value === this.props.value) {
            return
        }

        if (value instanceof Set) {
            this.setState({value})
        } else if (typeof value === 'string' || typeof value === 'number') {
            this.setState({
                value: new Set([value])
            })
        } else if (Array.isArray(value)) {
            this.setState({
                value: new Set(value)
            })
        } else {
            this.setState({
                value: new Set()
            })
        }
    }
    render() {
        const {isOpen, holder} = this
        const {children} = this.props
        const {value} = this.state
        const {placeholder} = this.props
        const styleName = isOpen ? 'Input--Open' : 'Input'

        return (
            <div styleName='Container' onClick={this.handleClick}>
                <div styleName={styleName} tabIndex={0} onFocus={this.handleFocus} onBlur={this.handleBlur} >
                    <Holder value={holder} placeholder={placeholder} />
                </div>
                <OptionSet show={isOpen} onOptionClick={this.handleOptionClick} selected={value}>
                    {children}
                </OptionSet>
            </div>
        )
    }
}
