import React from 'react'
import Renderer from 'react-test-renderer'
import { TabSet, Tab } from './'

// properties needed by the tabset component
function createNodeMock(element) {
    if (element.type === 'ul') {
        return {
            offsetWidth: 150,
            childNodes: [],
        }
    }

    return null
}

test('tab component', () => {
    const tabs = Renderer.create(
        <TabSet>
            <Tab title="Title #1">Content #1</Tab>
            <Tab title="Title #2">Content #2</Tab>
            <Tab title="Title #3">Content #3</Tab>
        </TabSet>,
        { createNodeMock }
    )

    expect(tabs).toMatchSnapshot()
})
