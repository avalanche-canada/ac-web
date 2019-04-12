import React from 'react'
import PropTypes from 'prop-types'
import styles from './QuestionAnswer.css'

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

Question.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Question({ children }) {
    return <p className={styles.Question}>{children}</p>
}

export function Answer({ children, ...props }) {
    return (
        <div {...props} className={styles.Answer}>
            {children}
        </div>
    )
}
