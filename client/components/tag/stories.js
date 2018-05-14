import React from 'react'
import { storiesOf, action } from '@storybook/react'
import TagSet from './TagSet'
import Tag from './Tag'

const stories = storiesOf('Tag', module)

stories.add('TagSet', () => {
    return (
        <TagSet {...props}>
            <Tag>
                Tag #1
            </Tag>
            <Tag>
                Tag #2
            </Tag>
            <Tag>
                Tag #3
            </Tag>
        </TagSet>
    )
})
