import React, { PropTypes, Component, cloneElement, Children } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import keycode from 'keycode'
import Backdrop from '../misc/Backdrop'

class ItemSet extends Component {
    state = {
        activeIndex: null
    }
    constructor(...args) {
        super(...args)

        this.onKeyUp = this.handleKeyUp.bind(this)
        this.close = this.close.bind(this)
    }
    set activeIndex(activeIndex) {
        this.setState({ activeIndex })
    }
    get activeIndex() {
        return this.state.activeIndex
    }
    handleClick(index) {
        if (this.activeIndex === index) {
            this.close()
        } else {
            this.open(index)
        }
    }
    handleKeyUp({ keyCode }) {
        if (keycode.codes.esc !== keyCode ) {
            return
        }

        this.close()
    }
    open(index) {
        this.activeIndex = index
    }
    close() {
        this.activeIndex = null
    }
    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp)
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp)
    }
    render() {
        return (
            <div>
                <ul styleName='ItemSet'>
                    {Children.map(this.props.children, (item, index) => {
                        const isActive = this.activeIndex === index

                        if (Children.count(item.props.children) === 0) {
                            return item
                        }

                        const props = {
                            isActive,
                            onClick: event => {
                                event.preventDefault()
                                this.handleClick(index)
                            }
                        }
                        const children = cloneElement(item.props.children, {
                            isOpened: isActive
                        })

                        return cloneElement(item, props, children)
                    })}
                </ul>
                <Backdrop onClick={this.close} />
            </div>
        )
    }
}

export default CSSModules(ItemSet, styles)
