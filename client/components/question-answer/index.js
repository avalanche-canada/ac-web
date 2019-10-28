import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'components/panel'
import Shim from 'components/Shim'

QuestionAnswer.propTypes = {
    question: PropTypes.node.isRequired,
    answer: PropTypes.node.isRequired,
}

export default function QuestionAnswer({ question, answer }) {
    return (
        <Panel header={question}>
            <Shim horizontal>{answer}</Shim>
        </Panel>
    )
}
