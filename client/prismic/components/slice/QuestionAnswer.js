import React from 'react'
import Base from 'components/question-answer'
import { StructuredText } from 'prismic/components/base'

export default function QuestionAnswer({ value }) {
    const [{ question, answer }] = value

    return (
        <Base question={question} answer={<StructuredText value={answer} />} />
    )
}
