import React from 'react'
import {Term, Definition} from 'components/description'
import {trulyKeys} from 'utils/object'

const BooleanValues = new Map([
    [true, 'Yes'],
    [false, 'No'],
])

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

        children.push(
            <Term key={`${key}-term`}>
                {terms[key] || key}
            </Term>
        )

        switch (typeof value) {
            case 'string':
            case 'number':
                children.push(
                    <Definition key={key}>{value}</Definition>
                )
                break;
            case 'boolean':
                children.push(
                    <Definition>{BooleanValues.get(value)}</Definition>
                )
                break;
            case 'function':
                children.push(
                    <Definition key={key}>{value(values)}</Definition>
                )
                break;
            case 'object':
                children.push(
                    <Definition key={key}>{trulyKeys(value).join('. ')}</Definition>
                )
                break;
        }

        return children
    }, [])
}
