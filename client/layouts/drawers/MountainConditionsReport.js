import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Header, Body, Navbar, Close, Banner } from 'components/page/drawer'
import { Footer, Media } from 'layouts/products/mcr'
import { WHITE } from 'constants/colors'
import Shim from 'components/Shim'
import { GenericContent, Title, GenericProvider } from 'prismic/layouts'
import { Found } from 'contexts/async'

MountainConditionsReport.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
}

export default function MountainConditionsReport({ onCloseClick }) {
    return (
        <Fragment>
            <Body>
                <Navbar style={NAVBAR_STYLE}>
                    <Close
                        shadow
                        onClick={onCloseClick}
                        style={CLOSE_BUTTON_STYLE}
                    />
                </Navbar>
                <Fragment>
                    <Banner>
                        <Media />
                    </Banner>
                    <GenericProvider uid="mcr-shutdown-covid">
                        <Header subject="Arc'Teryx Mountain Conditions Report">
                            <h1>
                                <Title />
                            </h1>
                        </Header>
                        <Shim horizontal>
                            <Found>
                                <GenericContent />
                            </Found>
                            <Footer />
                        </Shim>
                    </GenericProvider>
                </Fragment>
            </Body>
        </Fragment>
    )
}

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}
const CLOSE_BUTTON_STYLE = {
    backgroundColor: WHITE,
}
