import React, { PureComponent, Children, createElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Danger.css'
import { FirstDay } from './Day'

export default class DaySet extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    createDay = (day, index) => {
        return index === 0 ? createElement(FirstDay, day.props) : day
    }
    render() {
        return (
            <div className={styles.DaySet}>
                {Children.map(this.props.children, this.createDay)}
            </div>
        )
    }
}
