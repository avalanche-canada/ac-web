import React, {PropTypes} from 'react'
import Section from './Section'
import Comment from './Comment'
import {asTermAndDefinition} from './utils'
import {List, Term, Definition} from 'components/description'

Content.propTypes = {
    comment: PropTypes.string.isRequired,
}

export default function Content({comment, ...values}) {
    return (
        <div>
            <Section title='Information'>
                <List bordered>
                    {asTermAndDefinition(values)}
                </List>
            </Section>
            <Comment>
                {comment}
            </Comment>
        </div>
    )
}
