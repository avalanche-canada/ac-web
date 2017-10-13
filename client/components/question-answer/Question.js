import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './QuestionAnswer.css'

Question.propTypes = {
    children: PropTypes.node.isRequired,
}

function Question({ children }) {
    return (
        <p styleName="Question">
            {children}
        </p>
    )
}

export default CSSModules(Question, styles)
