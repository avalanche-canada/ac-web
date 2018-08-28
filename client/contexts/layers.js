import React, { createContext, Component } from 'react'

const Context = createContext({ opened: false })

export default class Provider extends Component {
    state = {}
    get value() {
        return {
            on: this.on,
            off: this.off,
            toggle: this.toggle,
        }
    }
    on = id => {
        this.setState({ [id]: true })
    }
    off = id => {
        this.setState({ [id]: false })
    }
    toggle = id => {
        // this.setState(({ opened }) => ({ opened: !opened }))
    }
    render() {
        return <Context.Provider value={this.value} />
    }
}

export const Consumer = Context.Consumer
