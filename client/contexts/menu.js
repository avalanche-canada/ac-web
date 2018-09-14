import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

const Context = createContext()

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    state = {
        opened: false,
    }
    get value() {
        return {
            opened: this.state.opened,
            open: this.open,
            close: this.close,
            toggle: this.toggle,
        }
    }
    open = () => {
        this.setState({ opened: true })
    }
    close = () => {
        this.setState({ opened: false })
    }
    toggle = () => {
        this.setState(({ opened }) => ({ opened: !opened }))
    }
    render() {
        return (
            <Context.Provider value={this.value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
