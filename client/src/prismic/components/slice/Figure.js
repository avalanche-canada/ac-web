import React from 'react'
import {Media, Caption} from '/components/media'
import {List, Term, Definition} from '/components/description'
import {InnerHTML} from '/components/misc'

function Figure({content}) {
    const {figure, credit, caption} = content[0]
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

export default Figure
