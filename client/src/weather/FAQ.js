import React from 'react'
import getFAQ from './getFAQ'
import QuestionAnswer from './QuestionAnswer'
import { Html } from '../prismic'

function extractQuestionAnswer(qa) {
    return {
        question: <Html document={qa} fragment='question' />,
        answer: <Html document={qa} fragment='answer' />,
    }
}

function FAQ({ faq }) {
    const group = faq.get('weather-forecast-faq.faq')
    const qas = group.toArray() || []

    return (
        <section>
            {qas.map(extractQuestionAnswer).map(QuestionAnswer)}
        </section>
    )
}

export default getFAQ(FAQ)
