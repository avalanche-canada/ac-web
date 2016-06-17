import React, {PropTypes} from 'react'
import {InnerHTML} from 'components/misc'

Html.propTypes = {
    document: PropTypes.object.isRequired,
    fragment: PropTypes.string,
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

    return (
        <InnerHTML>
            {doc.asHtml(linkResolver, htmlSerializer)}
        </InnerHTML>
    )
}
