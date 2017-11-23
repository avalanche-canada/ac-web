import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import noop from 'lodash/noop'
import { ChevronLeft, ChevronRight } from 'components/icons'
import Button from 'components/button'
import styles from './Flipper.css'

const LEFT = 'Left'
const RIGHT = 'Right'

class Segment extends PureComponent {
    static propTypes = {
        position: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
        onNavigate: PropTypes.func.isRequired,
        hint: PropTypes.string,
        hidden: PropTypes.bool,
        children: PropTypes.node.isRequired,
    }
    static defaultProps = {
        onNavigate: noop,
        hidden: false,
    }
    constructor(props) {
        super(props)

        this.classNames = classnames.bind(styles)
        this.icons = new Map([
            [LEFT, <ChevronLeft inverse />],
            [RIGHT, <ChevronRight inverse />],
        ])
    }
    get className() {
        const { position, hidden } = this.props

        return this.classNames({
            Left: position === LEFT,
            Right: position === Right,
            Hidden: hidden,
        })
    }
    get hint() {
        const { position, hint } = this.props

        return hint || position === LEFT ? 'Previous' : 'Next'
    }
    get icon() {
        return this.icons.get(this.props.position)
    }
    render() {
        const { onNavigate, children } = this.props

        return (
            <div className={this.className}>
                <div className={styles.Navigation}>
                    <Button onClick={onNavigate}>{this.icon}</Button>
                </div>
                <div className={styles.Description}>
                    <div className={styles.Hint}>{this.hint}</div>
                    {children}
                </div>
            </div>
        )
    }
}

Left.propTypes = Right.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    hint: PropTypes.string,
    hidden: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

export function Left(props) {
    return <Segment position={LEFT} {...props} />
}

export function Right(props) {
    return <Segment position={RIGHT} {...props} />
}

Center.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Center({ children }) {
    return <div className={styles.Center}>{children}</div>
}
