import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Pagination.css'
import Segment, {First, Previous, Next, Last} from './Segment'

Pagination.propTypes = {
    location: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    first: PropTypes.bool,
    previous: PropTypes.bool,
    next: PropTypes.bool,
    last: PropTypes.bool,
    max: PropTypes.number,
}

function toLocation(page, location) {
    return {
        ...location,
        query: {
            ...location.query,
            page,
        }
    }
}

function createSegment(page, location) {
    return createElement(Segment, {
        location: toLocation(page, location)
    }, page)
}

function Pagination({
    location = {},
    total = 0,
    first = false,
    previous = false,
    next = false,
    last = false,
    max = 10,
}) {
    if (total < 2) {
        return null
    }

    const list = Array(Math.min(total, max)).fill(null)

    return (
        <div styleName='Container'>
            {first && <First />}
            {previous && <Previous />}
            {list.map((value, index) => createSegment(index + 1, location))}
            {next && <Next />}
            {last && <Last />}
        </div>
    )
}

export default CSSModules(Pagination, styles)
