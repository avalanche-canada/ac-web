import React from 'react'
import {Term, Definition} from 'components/description'
import {trulyKeys} from 'utils/object'

export function asTermAndDefinition(values = {}, terms = {}) {
    return Object.keys(values).reduce((children, key) => {
        const value = values[key]

        if (value === undefined || value === null) {
            return children
        }

        children.push(
            <Term key={`${key}-term`}>
                {terms[key] || key}
            </Term>
        )

        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
                children.push(
                    <Definition key={key}>{value}</Definition>
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
