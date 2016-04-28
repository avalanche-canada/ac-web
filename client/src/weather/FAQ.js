import React, { PropTypes } from 'react'
import QuestionAnswer from './QuestionAnswer'
import { Html } from '../prismic'

function extractQuestionAnswer(qa) {
    return {
        question: <Html document={qa} fragment='question' />,
        answer: <Html document={qa} fragment='answer' />,
    }
}

FAQ.propTypes = {
    document: PropTypes.object.isRequired
}

export default function FAQ({ document }) {
    const group = document.get('weather-forecast-faq.faq')
    const qas = group.toArray() || []

    return (
        <section>
            {qas.map(extractQuestionAnswer).map(QuestionAnswer)}
        </section>
    )
}
