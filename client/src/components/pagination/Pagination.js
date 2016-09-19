import React, {PropTypes, createElement} from 'react'
import {compose, withHandlers} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Pagination.css'
import Segment, {First, Previous, Next, Last} from './Segment'

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    location: PropTypes.object,
    first: PropTypes.bool,
    previous: PropTypes.bool,
    next: PropTypes.bool,
    last: PropTypes.bool,
    max: PropTypes.number,
    property: PropTypes.string,
}

function extendLocation(location, page, property) {
    if (!location) {
        return
    }

    return {
        ...location,
        query: {
            ...location.query,
            [property]: page,
        }
    }
}

function pages(number) {
    return Array(number).fill(null).map((v, i) => i + 1)
}

function Pagination({
    total = 0,
    active = 0,
    first = false,
    previous = false,
    next = false,
    last = false,
    max = 10,
    location,
    property = 'page',
    createOnClickHandler,
}) {
    if (total < 2) {
        return null
    }

    return (
        <div styleName='Container'>
            {first && <First />}
            {previous && <Previous />}
            {pages(Math.min(total, max)).map((page, index) => (
                createElement(Segment, {
                    key: index,
                    location: extendLocation(location, page, property),
                    onClick: createOnClickHandler(page),
                    isActive: active === page,
                }, page)
            ))}
            {next && <Next />}
            {last && <Last />}
        </div>
    )
}

export default compose(
    withHandlers({
        createOnClickHandler: props => page => event => {
            const {onChange} = props

            if (typeof onChange === 'function') {
                event.preventDefault()
                onChange(page)
            }
        }
    }),
    CSSModules(styles),
)(Pagination)
