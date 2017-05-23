import React from 'react'
import { mapProps } from 'recompose'
import QuestionAnswer from '~/components/question-answer'
import { parse } from '~/prismic'
import { StructuredText } from '~/prismic/components/base'

export default mapProps(props => {
    const [{ question, answer }] = parse(props)

    return {
        question,
        answer: <StructuredText value={answer} />,
    }
})(QuestionAnswer)
