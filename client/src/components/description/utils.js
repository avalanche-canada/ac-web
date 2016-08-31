import React from 'react'
import {Term, Definition} from 'components/description'
import {trulyKeys} from 'utils/object'

const {keys} = Object
const {isArray} = Array

export function asTermAndDefinition(values = {}) {
    return keys(values).reduce((children, key) => {
        const value = values[key]

        if (value === undefined || value === null) {
            return children
        }

        children.push(<Term>{key}</Term>)

        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
                children.push(<Definition>{value}</Definition>)
                break;
            case 'function':
                children.push(<Definition>{value(values)}</Definition>)
                break;
            case 'object':
                children.push(<Definition>{trulyKeys(value).join('. ')}</Definition>)
                break;
        }

        return children
    }, [])
}
