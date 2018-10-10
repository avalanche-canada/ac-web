import React, { createElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.css'
import Segment, { Disabled } from './Segment'
import pagination from 'utils/pagination'

export default class Pagination extends PureComponent {
    static propTypes = {
        total: PropTypes.number.isRequired,
        active: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        total: 0,
        active: 1,
        onChange() {},
    }

    get total() {
        return Math.ceil(this.props.total)
    }
    get segments() {
        const { active } = this.props

        if (this.total <= 10) {
            return Array(this.total)
                .fill(1)
                .map((value, index) => value + index)
        }

        return pagination(active, this.total, 3, null)
    }
    createSegment(page, index) {
        const { onChange, active } = this.props

        if (typeof page === 'number') {
            return createElement(Segment, {
                key: index,
                page,
                onActivate: onChange,
                isActive: active === page,
            })
        } else {
            return <Disabled key={index}>…</Disabled>
        }
    }
    render() {
        if (this.total < 2) {
            return null
        }

        return (
            <div className={styles.Container}>
                {this.segments.map(this.createSegment, this)}
            </div>
        )
    }
}
