import React, { Component, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Backdrop from '../misc/Backdrop'
import styles from './Navbar.css'

export default class ItemSet extends Component {
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
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp)
    }
    // componentWillReceiveProps({ location }) {
    //     if (location !== this.props.location) {
    //         this.close()
    //     }
    // }
    get children() {
        return Children.toArray(this.props.children).filter(Boolean)
    }
    renderItem = (item, index) => {
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
    }
    render() {
        return (
            <div className={styles['ItemSet--Container']}>
                <ul className={styles.ItemSet}>
                    {this.children.map(this.renderItem)}
                </ul>
                {this.opened && <Backdrop onClick={this.close} />}
            </div>
        )
    }
}
