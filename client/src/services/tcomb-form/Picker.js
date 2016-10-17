import React, {PropTypes, Component} from 'react'

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
            isOpen: this.state.isOpen,
            open: this.open,
            close: this.close,
            toggle: this.toggle,
            onReset: this.onReset,
            onSelect: this.onSelect,
            ...this.props,
        }
    }
    open = () => {
        this.setState({ isOpen: true })
    }
    close = () => {
        this.setState({ isOpen: false })
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
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
