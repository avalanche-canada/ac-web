import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import styles from './Carousel.css'

Panel.propTypes = {
    children: PropTypes.node.isRequired,
    onActivate: PropTypes.func.isRequired,
}

export function Panel({ children }) {
    return (
        <li className={styles.Panel}>
            {children}
        </li>
    )
}

function computeStyle({ x }) {
    return {
        transform: `translateX(-${x}%)`,
    }
}

function computeMotionStyle(index) {
    return {
        x: spring(index * 1 / 3 * 100),
    }
}

const DEFAULT_STYLE = { x: 0 }

export default class PanelSet extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        activeIndex: PropTypes.number.isRequired,
        onPanelCountChange: PropTypes.func.isRequired,
    }
    changeCount() {
        const count = Children.count(this.props.children)

        this.setState({ count }, () => {
            this.props.onPanelCountChange(count)
        })
    }
    componentWillMount() {
        this.changeCount()
    }
    componentDidUpdate() {
        this.changeCount()
    }
    render() {
        const style = computeMotionStyle(this.props.activeIndex)

        return (
            <Motion defaultStyle={DEFAULT_STYLE} style={style}>
                {style =>
                    <ul className={styles.PanelSet} style={computeStyle(style)}>
                        {Children.map(this.props.children, child =>
                            <Panel>
                                {child}
                            </Panel>
                        )}
                    </ul>}
            </Motion>
        )
    }
}
