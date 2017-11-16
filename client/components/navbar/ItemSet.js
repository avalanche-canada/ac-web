import React, { PureComponent, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './Navbar.css'
import keycode from 'keycode'
import Backdrop from '../misc/Backdrop'
import { withRouter } from 'react-router-dom'

@withRouter
export default class ItemSet extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        location: PropTypes.object.isRequired,
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
    componentWillReceiveProps({ location }) {
        if (location !== this.props.location) {
            this.close()
        }
    }
    render() {
        return (
            <div className={styles['ItemSet--Container']}>
                <ul className={styles.ItemSet}>
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
