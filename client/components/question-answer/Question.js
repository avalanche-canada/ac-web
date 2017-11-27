import React from 'react'
import PropTypes from 'prop-types'
import styles from './QuestionAnswer.css'

Question.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Question({ children }) {
    return <p className={styles.Question}>{children}</p>
}
