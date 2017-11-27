import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
import Answer from './Answer'

QuestionAnswer.propTypes = {
    question: PropTypes.node.isRequired,
    answer: PropTypes.node.isRequired,
}

export default function QuestionAnswer({ question, answer }) {
    return (
        <section>
            <Question>{question}</Question>
            <Answer>{answer}</Answer>
        </section>
    )
}
