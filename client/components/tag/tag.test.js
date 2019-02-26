import React from 'react'
import Renderer from 'react-test-renderer'
import { TagSet, Tag } from './'

test('tag component', () => {
    const tags = Renderer.create(
        <TagSet>
            <Tag>Tag #1</Tag>
            <Tag>Tag #2</Tag>
            <Tag>Tag #3</Tag>
        </TagSet>
    )

    expect(tags).toMatchSnapshot()
})
