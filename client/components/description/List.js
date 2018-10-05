import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

export default class List extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        columns: PropTypes.oneOf([1, 2, 3]),
        theme: PropTypes.oneOf(['Simple', 'Inverse']),
        condensed: PropTypes.bool,
        bordered: PropTypes.bool,
        style: PropTypes.object,
    }
    static defaultProps = {
        columns: 1,
        theme: 'Simple',
        condensed: false,
        bordered: false,
    }
    classnames = classnames.bind(styles)
    get className() {
        const { columns, theme, condensed, bordered } = this.props

        return this.classnames(`List--${theme}--${columns}Columns`, {
            Condensed: condensed,
            Bordered: bordered,
        })
    }
    render() {
        const { style, children } = this.props

        return (
            <dl style={style} className={this.className}>
                {children}
            </dl>
        )
    }
}
