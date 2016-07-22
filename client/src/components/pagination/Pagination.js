import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Pagination.css'
import Segment, {First, Previous, Next, Last} from './Segment'

function K() {}

function computeShow({pages, active, first, previous, next, last}) {
    return {
        first: first && active > 1,
        previous: previous && active > 0,
        next: next && active < pages,
        last: last && active < pages,
    }
}

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    active: PropTypes.number,
    first: PropTypes.bool,
    previous: PropTypes.bool,
    next: PropTypes.bool,
    last: PropTypes.bool,
    onSelect: PropTypes.func,
    max: PropTypes.number,
}

function Pagination({
    pages,
    active = 0,
    first = false,
    previous = false,
    next = false,
    last = false,
    onSelect = K,
    max = 10,
}) {
    const show = computeShow({pages, active, first, previous, next, last})
    const list = Array(Math.min(pages, max)).fill()

    return (
        <div styleName='Container'>
            {show.first && <First onClick={e => onSelect(0)} />}
            {show.previous && <Previous onClick={e => onSelect(active - 1)} />}
            {list.map((value, index) => (
                <Segment active={active === index} onClick={e => onSelect(index)}>
                    {index + 1}
                </Segment>
            ))}
            {show.next && <Next onClick={e => onSelect(active + 1)} />}
            {show.last && <Last onClick={e => onSelect(pages - 1)} />}
        </div>
    )
}

export default CSSModules(Pagination, styles)
