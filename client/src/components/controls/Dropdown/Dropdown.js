import React, {PropTypes, Component, Children, cloneElement} from 'react'
import {compose, withState} from 'recompose'
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
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Set)]),
        placeholder: PropTypes.string,
        multiple: PropTypes.bool,
    }
    static defaultProps = {
        onChange: K,
        placeholder: 'Select',
    }
    state = {
        open: false,
        label: null,
        active: 0,
        value: new Set(),
    }
    constructor(props) {
        super(props)

        if (props.value instanceof Set) {
            this.state.value = props.value
        } else {
            this.state.value = new Set([props.value])
        }
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
    get holder() {
        const {value} = this.state
        const children = Children.toArray(this.props.children)
        const options = children.filter(option => value.has(option.props.value))

        return options.map(option => option.props.children).join(', ')
    }
    close(callback = K) {
        // TODO: What? open = true to close the Dropdown.
        this.setState({
            open: true
        }, callback)
    }
    valueAt(index) {
        const options = Children.toArray(this.props.children)

        return options[index].props.value
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

        // SHAME: Needs to be fixed
        setTimeout(() => {
            this.open = false
        }, 100)
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

        if (props.value instanceof Set) {
            this.setState({value})
        } else {
            this.setState({
                value: new Set([...props.value])
            })
        }
    }
    render() {
        const {open, active} = this
        const {children} = this.props
        const {value} = this.state
        const {placeholder} = this.props
        const styleName = open ? 'Input--Open' : 'Input'
        function cloneOption(option) {
            return cloneElement(option, {
                active: value.has(option.props.value),
                onClick: this.handleOptionClick,
            })
        }

        return (
            <div styleName='Container' onClick={this.handleClick}>
                <div styleName={styleName} tabIndex={0} onFocus={this.handleFocus} onBlur={this.handleBlur} >
                    <Holder value={this.holder} placeholder={placeholder} />
                </div>
                {open &&
                    <div styleName='OptionSet'>
                        {Children.map(children, cloneOption, this)}
                    </div>
                }
            </div>
        )
    }
}
