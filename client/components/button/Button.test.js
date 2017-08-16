import React from 'react'
import Renderer from 'react-test-renderer'
import Button, { Close, Expand, Locate, Sorting } from './'
import { ALL } from './kinds'

function match(component) {
    expect(Renderer.create(component)).toMatchSnapshot()
}

test('button component', () => {
    match(<Button>Content</Button>)
    match(<Button active>Content</Button>)
    match(<Button shadow>Content</Button>)
    match(<Button large>Content</Button>)
    match(<Button transparent>Content</Button>)
    match(<Button chevron>Content</Button>)
    match(<Close>Content</Close>)
    match(<Expand>Content</Expand>)
    match(<Locate>Content</Locate>)
    match(<Sorting>Content</Sorting>)

    Array.from(ALL).forEach(kind => match(<Button kind={kind}>Content</Button>))
})
