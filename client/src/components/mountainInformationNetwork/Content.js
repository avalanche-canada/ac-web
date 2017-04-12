import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import List from './List'

Content.propTypes = {
    comment: PropTypes.node.isRequired,
    descriptionTitle: PropTypes.string,
    descriptions: PropTypes.node.isRequired,
}

function Content({
    comment,
    descriptions,
    descriptionTitle = 'Information'
}) {
    return (
        <div>
            <List title={descriptionTitle}>
                {descriptions}
            </List>
            <Comment>
                {comment}
            </Comment>
        </div>
    )
}

export default Content
