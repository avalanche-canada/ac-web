import React, {PropTypes} from 'react'
import Section from './Section'
import Comment from './Comment'
import {List} from 'components/description'

Content.propTypes = {
    comment: PropTypes.string.isRequired,
    descriptions: PropTypes.node.isRequired,
}

export default function Content({comment, descriptions}) {
    return (
        <div>
            <Section title='Information'>
                <List bordered>
                    {descriptions}
                </List>
            </Section>
            <Comment>
                {comment}
            </Comment>
        </div>
    )
}
