import React from 'react'
import { mapProps } from 'recompose'
import QuestionAnswer from '~/components/question-answer'
import { StructuredText } from '~/prismic/components/base'

export default mapProps(({ value }) => {
    const { question, answer } = value[0]

    return {
        question,
        answer: <StructuredText value={answer} />,
    }
})(QuestionAnswer)
