import React, { Children, cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Table.css'
import { Expand } from 'components/button'

export default class Row extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        controlled: PropTypes.bool,
        onClick: PropTypes.func,
    }
    constructor(props) {
        super(props)

        this.classNames = classnames.bind(styles)
    }
    get className() {
        return this.classNames({
            Row: true,
            'Row--Controlled': this.props.controlled,
            'Row--Clickable': typeof this.props.onClick === 'function',
        })
    }

    render() {
        const { children, onClick } = this.props

        return (
            <tr className={this.className} onClick={onClick}>
                {children}
            </tr>
        )
    }
}

export class Expandable extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.instanceOf(Row)).isRequired,
    }
    state = {
        expanded: false,
    }
    handleExpandedToggle = () => this.setState(toggleExpanded)
    get children() {
        const children = this.props.children[0]
        const lastIndex = Children.count(children.props.children) - 1
        const cells = Children.map(children.props.children, (child, index) => {
            if (index !== lastIndex) {
                return child
            }

            return cloneElement(child, TR_WITH_BUTTON_PROPS, [
                child.props.children,
                <Expand
                    key="expand"
                    expanded={this.state.expanded}
                    onClick={this.handleExpandedToggle}
                />,
            ])
        })

        return cloneElement(children, null, cells)
    }
    get controlled() {
        return cloneElement(this.props.children[1], {
            controlled: true,
        })
    }
    render() {
        return this.state.expanded
            ? [this.children, this.controlled]
            : this.children
    }
}

// Utils
function toggleExpanded({ expanded }) {
    return {
        expanded: !expanded,
    }
}
const TR_WITH_BUTTON_PROPS = {
    style: {
        paddingRight: 36,
    },
}
