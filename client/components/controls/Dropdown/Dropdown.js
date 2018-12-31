import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Holder from '../Holder'
import { OptionSet, Option, Dropdown } from 'components/controls/options'
import styles from './Dropdown.css'

export default class DropdownControl extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(Option).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
            PropTypes.instanceOf(Set),
        ]),
        placeholder: PropTypes.string,
        style: PropTypes.object,
    }
    static defaultProps = {
        placeholder: 'Select',
    }
    state = {
        isOpen: false,
        active: 0,
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

        this.setState({ active })
    }
    get holder() {
        const { value } = this.props
        const children = Children.toArray(this.props.children)
        const options = children.filter(option =>
            value instanceof Set
                ? value.has(option.props.value)
                : value == option.props.value
        )

        return options.length
            ? options
                  .map(element => element.props.children)
                  .reduce((elements, current, index) => {
                      if (index > 0) {
                          elements.push(', ')
                      }
                      elements.push(current)

                      return elements
                  }, [])
            : null
    }
    close = callback => {
        this.setState({ isOpen: false }, callback)
    }
    open = callback => {
        this.setState({ isOpen: true }, callback)
    }
    toggle = callback => {
        this.setState(toggle, callback)
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
    handleFocus = ({ target }) => {
        target.addEventListener('keyup', this.handleKeyUp)
        target.addEventListener('keydown', this.handleKeyDown)
        this.target = target
    }
    handleBlur = ({ target }) => {
        target.removeEventListener('keyup', this.handleKeyUp)
        target.removeEventListener('keydown', this.handleKeyDown)

        // SHAME: Needs to be fixed
        setTimeout(this.close, 100)
    }
    handleChange = option => {
        const { onChange } = this.props

        this.close(() => onChange(option))
    }
    get options() {
        return (
            <Dropdown>
                <OptionSet
                    onChange={this.handleChange}
                    value={this.props.value}>
                    {this.props.children}
                </OptionSet>
            </Dropdown>
        )
    }
    render() {
        const { isOpen } = this
        const { placeholder, style } = this.props
        const className = isOpen ? 'Input--Open' : 'Input'

        return (
            <div
                className={styles.Container}
                style={style}
                onClick={this.handleClick}>
                <div
                    className={styles[className]}
                    tabIndex={0}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}>
                    <Holder value={this.holder} placeholder={placeholder} />
                </div>
                {isOpen ? this.options : null}
            </div>
        )
    }
}

// Utils & constants
const scrollStopperKeyCodes = new Set([keycode.codes.up, keycode.codes.down])
function toggle({ isOpen }) {
    return {
        isOpen: !isOpen,
    }
}
