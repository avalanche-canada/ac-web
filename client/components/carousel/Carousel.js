import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ButtonSet from './ButtonSet'
import PanelSet from './PanelSet'
import styles from './Carousel.css'

export default class Carousel extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    state = {
        activeIndex: 0,
        slideCount: null,
    }
    activateNextPanel = () =>
        this.setState(({ activeIndex, slideCount }) => ({
            activeIndex: Math.min(activeIndex + 1, slideCount),
        }))
    activatePreviousPanel = () =>
        this.setState(({ activeIndex }) => ({
            activeIndex: Math.max(activeIndex - 1, 0),
        }))
    setPanelCount = slideCount => this.setState({ slideCount })
    render() {
        const { children } = this.props
        const { slideCount, activeIndex } = this.state

        return (
            <section className={styles.Carousel}>
                {Children.map(children, child => {
                    switch (child.type) {
                        case ButtonSet:
                            return cloneElement(child, {
                                activeIndex,
                                slideCount,
                                onActivatePreviousPanel: this
                                    .activatePreviousPanel,
                                onActivateNextPanel: this.activateNextPanel,
                            })
                        case PanelSet:
                            return cloneElement(child, {
                                activeIndex,
                                onPanelCountChange: this.setPanelCount,
                            })
                        default:
                            return child
                    }
                })}
            </section>
        )
    }
}
