import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './QuestionAnswer.css'

// TODO: Should be base component

QuestionAnswer.propTypes = {
    question: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

function QuestionAnswer({ question, answer }) {
    return (
        <section>
            <div styleName='Question'>{question}</div>
            <div styleName='Answer'>{answer}</div>
        </section>
    )
}

export default CSSModules(QuestionAnswer, styles)
