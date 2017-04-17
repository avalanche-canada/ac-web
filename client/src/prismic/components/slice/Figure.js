import React from 'react'
import PropTypes from 'prop-types'
import {Media, Caption} from '~/components/media'
import {List, Term, Definition} from '~/components/description'
import {InnerHTML} from '~/components/misc'

Figure.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
}

export default function Figure({content = []}) {
    const [{figure, credit, caption}] = content

    const cap = (
        <Caption>
            <InnerHTML>{caption}</InnerHTML>
            <List>
                <Term>Credit</Term>
                <Definition><InnerHTML>{credit}</InnerHTML></Definition>
            </List>
        </Caption>
    )

    return (
        <Media caption={cap} >
            <img src={figure.url} />
        </Media>
    )
}
