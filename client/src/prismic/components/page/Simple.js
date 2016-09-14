import React, {PropTypes} from 'react'
import {Page, Content, Header, Headline, Main, Banner} from 'components/page'
import Slice from 'prismic/components/slice'

Simple.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
}

export default function Simple({type, uid, content = []}) {
    return (
        <div className={`${type}-${uid}`}>
            {content.map(slice => <Slice {...slice} />)}
        </div>
    )
}
