import React, {PropTypes} from 'react'
import Section from './Section'
import Comment from './Comment'
import {List} from 'components/description'

Content.propTypes = {
    comment: PropTypes.string.isRequired,
    descriptionTitle: PropTypes.string,
    descriptions: PropTypes.node.isRequired,
}

export default function Content({comment, descriptions, descriptionTitle = 'Information'}) {
    return (
        <div>
            <Section title={descriptionTitle}>
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
