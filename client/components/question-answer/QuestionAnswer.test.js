import React from 'react'
import Renderer from 'react-test-renderer'
import QuestionAnswer from './QuestionAnswer'

test('question & answer component', () => {
    const qa = Renderer.create(
        <QuestionAnswer question="A question" answer="An answer" />
    )

    expect(qa).toMatchSnapshot()
})
