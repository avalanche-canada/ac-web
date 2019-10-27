import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { StructuredText } from 'prismic/components/base'
import css from './Quiz.css'

Quiz.propTypes = {
    primary: PropTypes.shape({
        question: PropTypes.array.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            answer: PropTypes.string.isRequired,
            feedback: PropTypes.array.isRequired,
            correctness: PropTypes.oneOf([0, 50, 100]).isRequired,
        }).isRequired
    ),
}

export default function Quiz({ items, primary }) {
    const [picked, pick] = useState(null)
    const answer = typeof picked === 'number' ? items[picked] : null
    const feedbackClassNames = classnames({
        [css.Feedback]: true,
        [css.FeedbackSuccess]: answer && answer.correctness === '100',
        [css.FeedbackError]: answer && answer.correctness === '0',
    })

    return (
        <fieldset>
            <legend>Quiz</legend>
            <label>{primary.question}</label>
            <div className={css.Content}>
                <div className={css.Choices}>
                    {items.map(({ answer }, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                value={String(index)}
                                onChange={event => {
                                    pick(Number(event.target.value))
                                }}
                                checked={picked === index}
                            />
                            {answer}
                        </label>
                    ))}
                </div>
                <div className={feedbackClassNames}>
                    {answer && <StructuredText value={answer.feedback} />}
                </div>
            </div>
        </fieldset>
    )
}
