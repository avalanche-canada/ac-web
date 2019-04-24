import React from 'react'
import PropTypes from 'prop-types'
import { SPAW as Component } from 'components/misc'
import { Region as Container } from 'layouts/SPAW'

SPAW.propTypes = {
    name: PropTypes.string.isRequired,
}

export default function SPAW({ name }) {
    return (
        <Container name={name}>
            {({ link }) => (
                <Component link={link} style={{ flex: 1, padding: 0 }} />
            )}
        </Container>
    )
}
