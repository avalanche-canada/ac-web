import React, { PropTypes } from 'react'

Html.propTypes = {
    fragment: PropTypes.string,
    document: PropTypes.object.isRequired,
    linkResolver: PropTypes.func,
    htmlSerializer: PropTypes.func,
}

export default function Html({ fragment, document, linkResolver, htmlSerializer }) {
    let doc = document

    if (typeof fragment === 'string') {
        doc = document.get(fragment)

        if (doc === null) {
            return null
        }
    }

    const __html = doc.asHtml(linkResolver, htmlSerializer)

    return (
        <div dangerouslySetInnerHTML={{ __html }} />
    )
}
