import React from 'react'
import {Term, Definition} from 'components/description'
import {DateElement, DateTime} from 'components/misc'
import {trulyKeys} from 'utils/object'
import parse from 'date-fns/parse'
import isValid from 'date-fns/is_valid'
import startOfDay from 'date-fns/start_of_day'
import isEqual from 'date-fns/is_equal'

// TODO: Should be only a function that sanitize keys and values!
// Rendering should be done outside of these functions
// TODO: Should not convert dates here

const BooleanValues = new Map([
    [true, 'Yes'],
    [false, 'No'],
])


function createDefinitionChildren(value) {
    switch (typeof value) {
        case 'string': {
            // TODO: So ugly, need to fix that!!!
            
            if (!isNaN(Number(value))) {
                return value
            }

            const date = parse(value)

            if (isValid(date)) {
                if (isEqual(date, startOfDay(isEqual))) {
                    return (
                        <DateElement value={date} />
                    )
                } else {
                    return (
                        <DateTime value={date} />
                    )
                }
            } else {
                return value
            }
        }
        case 'number':
            return value
        case 'boolean':
            return BooleanValues.get(value)
        case 'function':
            return value(this)
        case 'object': {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    return (
                        <ul>
                            {value.map((value, index) => (
                                <li key={index}>
                                    {createDefinitionChildren.call(this, value)}
                                </li>
                            ))}
                        </ul>
                    )
                }
            } else {
                return createDefinitionChildren.call(this, trulyKeys(value))
            }
        }
    }
}

export function asTermAndDefinition(values = {}, terms = {}, nullValue) {
    return Object.keys(values).reduce((children, key) => {
        let value = values[key]

        if (value === undefined) {
            return children
        }

        if (value === null) {
            if (nullValue) {
                value = nullValue
            } else {
                return children
            }
        }

        const definition = createDefinitionChildren.call(values, value)

        if (definition !== undefined) {
            children.push(
                <Term key={`${key}-term`}>
                    {terms[key] || key}
                </Term>
            )

            children.push(
                <Definition key={key}>
                    {definition}
                </Definition>
            )
        }

        return children
    }, []).filter(Boolean)
}
