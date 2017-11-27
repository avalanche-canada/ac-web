import React, { Children, cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Table.css'
import { Expand } from 'components/button'
import noop from 'lodash/noop'

const TR = <tr />
const TR_WITH_BUTTON_PROPS = {
    style: {
        paddingRight: 36,
    },
}

export default class Row extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        hide: PropTypes.bool,
        controlled: PropTypes.bool,
        expanded: PropTypes.bool,
        onExpandedToggle: PropTypes.func,
        onClick: PropTypes.func,
    }
    static defaultProps = {
        expanded: null,
        onExpandedToggle: noop,
        hide: false,
        controlled: false,
    }
    constructor(props) {
        super(props)

        this.classNames = classnames.bind(styles)
    }
    get className() {
        const { controlled, onClick } = this.props

        return this.classNames({
            Row: !controlled,
            'Row--Controlled': controlled,
            'Row--Clickable': typeof onClick === 'function',
        })
    }
    get expandable() {
        const { children, expanded, onExpandedToggle } = this.props
        const lastIndex = Children.count(children) - 1

        return Children.map(children, (child, index) => {
            if (index !== lastIndex) {
                return child
            }

            const button = (
                <Expand
                    key={index}
                    expanded={expanded}
                    onClick={onExpandedToggle}
                />
            )

            return cloneElement(child, TR_WITH_BUTTON_PROPS, [
                child.props.children,
                button,
            ])
        })
    }
    render() {
        if (this.props.hide) {
            return TR
        }

        const { children, expanded, onClick } = this.props
        const expandable = expanded !== null

        return (
            <tr className={this.className} onClick={onClick}>
                {expandable ? this.expandable : children}
            </tr>
        )
    }
}
