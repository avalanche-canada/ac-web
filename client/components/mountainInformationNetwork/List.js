import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import { List as Base, Term, Definition } from 'components/description'
import { DateTime } from 'components/time'
import isNil from 'lodash/isNil'
import { trulyKeys } from 'utils/object'

List.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default function List({ title = 'Information', children = [] }) {
    if (children.length === 0) {
        return null
    }

    return (
        <Section title={title}>
            <Base bordered>{children}</Base>
        </Section>
    )
}

export class Entry extends PureComponent {
    static children(value) {
        switch (typeof value) {
            case 'string':
            case 'number':
                return value
            case 'boolean':
                return BooleanValues.get(value)
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
                                    <li key={index}>{Entry.children(value)}</li>
                                ))}
                            </ul>
                        )
                    }
                } else if (value instanceof Date) {
                    return <DateTime value={value} />
                } else {
                    return Entry.children(trulyKeys(value))
                }
            }
        }
    }
    static propTypes = {
        term: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
            PropTypes.array,
            PropTypes.object,
        ]).isRequired,
    }
    render() {
        const { term, children } = this.props

        if (isNil(children)) {
            return null
        }

        return (
            <Fragment>
                <Term>{term}</Term>
                <Definition>{Entry.children(children)}</Definition>
            </Fragment>
        )
    }
}

const BooleanValues = new Map([[true, 'Yes'], [false, 'No']])
