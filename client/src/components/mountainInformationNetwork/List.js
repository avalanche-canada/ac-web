import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import {List as Base} from '/components/description'

List.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function List({title, children = []}) {
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

export default List
