import React, { Fragment, Children } from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import { List as Base, Term, Definition } from 'components/description'
import { DateTime } from 'components/time'
import { trulyKeys } from 'utils/object'

List.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default function List({ title = 'Information', children }) {
    children = Children.toArray(children)

    if (
        children.length === 0 ||
        children.every(entry => entry.props.children === null)
    ) {
        return null
    }

    return (
        <Section title={title}>
            <Base bordered>{children}</Base>
        </Section>
    )
}

Entry.propTypes = {
    term: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
        PropTypes.array,
        PropTypes.object,
    ]),
}

export function Entry({ term, children }) {
    if (children == null) {
        return null
    }

    return (
        <Fragment>
            <Term>{term}</Term>
            <Definition>
                <Value value={children} />
            </Definition>
        </Fragment>
    )
}

function Value({ value }) {
    switch (typeof value) {
        case 'string':
        case 'number':
            return value
        case 'boolean':
            return value ? 'Yes' : 'No'
        case 'function':
            return value(this)
        case 'object': {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    return null
                } else {
                    return (
                        <ul>
                            {value.map((value, index) => (
                                <li key={index}>
                                    <Value value={value} />
                                </li>
                            ))}
                        </ul>
                    )
                }
            } else if (value instanceof Date) {
                return <DateTime value={value} />
            } else {
                return <Value value={trulyKeys(value)} />
            }
        }
    }
}
