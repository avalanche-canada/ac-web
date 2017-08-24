import React from 'react'
import Renderer from 'react-test-renderer'
import Mailto from './Mailto'

test('mailto component', () => {
    let mailto = Renderer.create(<Mailto email="kguillotte@avalanche.ca" />)

    expect(mailto).toMatchSnapshot()

    mailto = Renderer.create(
        <Mailto email="kguillotte@avalanche.ca">Karl Guillotte</Mailto>
    )

    expect(mailto).toMatchSnapshot()
})
