import React from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from '~/components/misc'
import Question from './Question'
import Answer from './Answer'

QuestionAnswer.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
}

export default function QuestionAnswer({ question, answer }) {
    return (
        <section>
            <Question>{question}</Question>
            <Answer>
                <InnerHTML>
                    {answer}
                </InnerHTML>
            </Answer>
        </section>
    )
}
