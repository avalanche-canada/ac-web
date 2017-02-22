import React, {PropTypes} from 'react'
import Section from './Section'
import {List as Base} from 'components/description'

List.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default function List({title, children = []}) {
    if (children.length === 0) {
        return null
    }
    
    return (
        <Section title={title}>
            <Base bordered>
                {children}
            </Base>
        </Section>
    )
}
