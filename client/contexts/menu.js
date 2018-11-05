import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    constructor(props) {
        super(props)

        this.state = {
            opened: false,
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
            <MenuContext.Provider value={this.state}>
                {this.props.children}
            </MenuContext.Provider>
        )
    }
}

const MenuContext = createContext()

export default MenuContext
