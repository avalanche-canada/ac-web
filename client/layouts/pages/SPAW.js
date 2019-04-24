import React from 'react'
import { SPAW as Component } from 'components/misc'
import { Region as Container } from 'layouts/SPAW'
import { StructuredText } from 'prismic/components/base'
import Shim from 'components/Shim'

export default function SPAW({ name }) {
    return (
        <Container name={name}>
            {({ document }) => {
                const { link, description } = document.data

                return (
                    <Shim top>
                        <Component link={link}>
                            <StructuredText value={description} />
                        </Component>
                    </Shim>
                )
            }}
        </Container>
    )
}
