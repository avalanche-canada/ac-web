import React, { createElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Pagination.css'
import Segment, { Disabled } from './Segment'
import range from 'lodash/range'
import pagination from 'utils/pagination'
import noop from 'lodash/noop'

@CSSModules(styles)
export default class Pagination extends PureComponent {
    static propTypes = {
        total: PropTypes.number.isRequired,
        active: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        total: 0,
        active: 1,
        onChange: noop,
    }
    get segments() {
        const { active, total } = this.props

        if (total <= 10) {
            return range(1, total + 1)
        }

        return pagination(active, total, 3, null)
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
        if (this.props.total < 2) {
            return null
        }

        return (
            <div styleName="Container">
                {this.segments.map(this.createSegment, this)}
            </div>
        )
    }
}
