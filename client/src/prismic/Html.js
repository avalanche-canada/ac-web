import React, { PropTypes } from 'react'

Html.propTypes = {
    fragment: PropTypes.string,
    document: PropTypes.object.isRequired,
}

export default function Html({ fragment, document }) {
    let doc = document

    if (typeof fragment === 'string') {
        doc = document.get(fragment)

        if (doc === null) {
            return null
        }
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: doc.asHtml() }} />
    )
}
