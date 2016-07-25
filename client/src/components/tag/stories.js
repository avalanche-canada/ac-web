import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {TagSet, Tag} from './index'

function tagSet(props = {}) {
    return (
        <TagSet {...props}>
            <Tag>
                Tag #1
            </Tag>
            <Tag>
                Tag #2
            </Tag>
            <Tag isActive>
                Tag #3
            </Tag>
        </TagSet>
    )
}


storiesOf('Tag', module).add('TagSet', () => tagSet())
