import React from 'react'
import {InnerHTML} from 'components/misc'
import {Blockquote, Footer} from 'components/blockquote'

export default function Quote({content, footer}) {
    return (
        <Blockquote>
            {content}
            {footer && <Footer>{footer}</Footer>}
        </Blockquote>
    )
}
