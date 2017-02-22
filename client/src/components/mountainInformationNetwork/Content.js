import React, {PropTypes} from 'react'
import Comment from './Comment'
import List from './List'

Content.propTypes = {
    comment: PropTypes.node.isRequired,
    descriptionTitle: PropTypes.string,
    descriptions: PropTypes.node.isRequired,
}

export default function Content({
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
