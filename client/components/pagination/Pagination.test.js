import React from 'react'
import Renderer from 'react-test-renderer'
import Pagination from './'

test('pagination component', () => {
    const pagination = Renderer.create(<Pagination total={10} active={5} />)

    expect(pagination).toMatchSnapshot()
})
