import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Header, Body, Navbar, Close } from 'components/page/drawer'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { Found } from 'contexts/async'
import { GenericContent, Title, GenericProvider } from 'prismic/layouts'

MountainInformationNetwork.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
}

export default function MountainInformationNetwork({ onCloseClick }) {
    return (
        <Fragment>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <GenericProvider uid="min-shutdown-covid">
                <Header subject="Mountain Information Network">
                    <h1>
                        <Title />
                    </h1>
                </Header>
                <Body>
                    <Shim horizontal>
                        <Found>
                            <GenericContent />
                        </Found>
                    </Shim>
                </Body>
            </GenericProvider>
        </Fragment>
    )
}
