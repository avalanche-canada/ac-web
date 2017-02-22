import React, {PropTypes, isValidElement} from 'react'
import Section from './Section'
import {Markup} from 'components/markup'
import {InnerHTML} from 'components/misc'

Comment.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
}

export default function Comment({title = 'Comments', children}) {
    if (!children) {
        return null
    }

    return (
        <Section title={title}>
            <Markup>
                {isValidElement(children) ? children : 
                    <InnerHTML>
                        {children}
                    </InnerHTML>
                }
            </Markup>
        </Section>
    )
}
