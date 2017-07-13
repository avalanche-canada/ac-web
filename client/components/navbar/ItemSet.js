import React, { PureComponent, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import keycode from 'keycode'
import Backdrop from '../misc/Backdrop'
import { history } from '~/router'

@CSSModules(styles)
export default class ItemSet extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    state = {
        activeIndex: null,
    }
    set activeIndex(activeIndex) {
        this.setState({ activeIndex })
    }
    get activeIndex() {
        return this.state.activeIndex
    }
    get opened() {
        return this.activeIndex !== null
    }
    handleClick(index) {
        if (this.activeIndex === index) {
            this.close()
        } else {
            this.open(index)
        }
    }
    handleKeyUp = ({ keyCode }) => {
        if (keycode.codes.esc !== keyCode) {
            return
        }

        this.close()
    }
    open(index) {
        this.activeIndex = index
    }
    close = () => {
        this.activeIndex = null
    }
    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp)
        history.listenBefore(this.close)
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp)
    }
    render() {
        return (
            <div styleName="ItemSet--Container">
                <ul styleName="ItemSet">
                    {Children.map(this.props.children, (item, index) => {
                        if (Children.count(item.props.children) === 0) {
                            return item
                        }

                        const isActive = this.activeIndex === index
                        const props = {
                            isActive,
                            onClick: event => {
                                event.preventDefault()
                                this.handleClick(index)
                            },
                        }
                        const children = cloneElement(item.props.children, {
                            isOpened: isActive,
                        })

                        return cloneElement(item, props, children)
                    })}
                </ul>
                {this.opened && <Backdrop onClick={this.close} />}
            </div>
        )
    }
}
