import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

export default class Cell extends PureComponent {
    static propTypes = {
        style: PropTypes.object,
        children: PropTypes.node.isRequired,
        colSpan: PropTypes.number,
    }
    render() {
        const { style, children, colSpan } = this.props
        return (
            <td className={styles.Cell} style={style} colSpan={colSpan}>
                {children}
            </td>
        )
    }
}
