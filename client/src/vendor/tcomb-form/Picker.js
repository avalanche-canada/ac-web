import {Component} from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        template: PropTypes.func.isRequired,
    }
    state = {
        isOpen: false
    }
    get locals() {
        return {
            isOpen: this.isOpen,
            open: this.open,
            close: this.close,
            toggle: this.toggle,
            onReset: this.onReset,
            onSelect: this.onSelect,
            ...this.props,
        }
    }
    get isOpen() {
        return this.state.isOpen
    }
    set isOpen(isOpen) {
        this.setState({isOpen})
    }
    open = () => {
        this.isOpen = true
    }
    close = () => {
        this.isOpen = false
    }
    toggle = () => {
        this.isOpen = !this.isOpen
    }
    onReset = () => {
        this.setState({isOpen: false}, () => {
            this.props.onChange(null)
        })
    }
    onSelect = (event, value) => {
        this.setState({isOpen: false}, () => {
            this.props.onChange(value)
        })
    }
    render() {
        return this.props.template(this.locals)
    }
}
