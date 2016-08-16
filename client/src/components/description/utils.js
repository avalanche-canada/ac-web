import React from 'react'
import {Term, Definition} from 'components/description'
import {trulyKeys} from 'utils/object'

const {keys} = Object
const {isArray} = Array

export function asTermAndDefinition(values = {}, renderers = new Map()) {
    return keys(values).reduce((children, key) => {
        const value = values[key]

        if (value === undefined || value === null) {
            return children
        }

        children.push(<Term>{key}</Term>)

        if (renderers.has(key) && typeof renderers.get(key) === 'function') {
            children.push(
                <Definition>
                    {renderers.get(key).call(null, values[key])}
                </Definition>
            )
        } else {
            switch (typeof value) {
                case 'string':
                case 'number':
                case 'boolean':
                    children.push(<Definition>{values[key]}</Definition>)
                    break;
                case 'object':
                    children.push(<Definition>{trulyKeys(value).join('. ')}</Definition>)
                    break;
            }
        }

        return children
    }, [])
}
