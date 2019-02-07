import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'
import styles from './Quiz.css'
import classnames from 'classnames/bind'

Quiz.propTypes = {
    nonRepeat: PropTypes.shape({
        question: PropTypes.array.isRequired,
    }).isRequired,
    repeat: PropTypes.arrayOf(
        PropTypes.shape({
            answer: PropTypes.string.isRequired,
            feedback: PropTypes.array.isRequired,
            correctness: PropTypes.oneOf([0, 50, 100]).isRequired,
        }).isRequired
    ),
}

export default function Quiz({ repeat, nonRepeat }) {
    const [picked, pick] = useState(null)
    const answer = typeof picked === 'number' ? repeat[picked] : null
    const feedbackClassNames = classNames({
        Feedback: true,
        FeedbackSuccess: answer && answer.correctness === '100',
        FeedbackError: answer && answer.correctness === '0',
    })

    return (
        <fieldset>
            <legend>Quiz</legend>
            <label>{nonRepeat.question}</label>
            <div className={styles.Content}>
                <div className={styles.Choices}>
                    {repeat.map(({ answer }, index) => (
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

// Styles
const classNames = classnames.bind(styles)
