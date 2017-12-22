import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import List from './List'

Content.propTypes = {
    comment: PropTypes.node.isRequired,
    title: PropTypes.string,
    descriptions: PropTypes.node.isRequired,
}

export default function Content({
    comment,
    descriptions,
    title = 'Information',
}) {
    return [
        <List title={title}>{descriptions}</List>,
        <Comment>{comment}</Comment>,
    ]
}
