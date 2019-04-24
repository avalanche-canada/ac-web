import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Region } from 'containers/features'
import { NorthRockies } from 'layouts/feed'
import SPAW from './SPAW'
import Sponsor from 'layouts/Sponsor'
import {
    Container,
    Navbar,
    Header,
    Body,
    Content,
    Close,
} from 'components/page/drawer'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/region'
import { memo } from 'utils/react'

NorthRockiesLayout.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function NorthRockiesLayout({ onCloseClick, onLocateClick }) {
    const name = 'north-rockies'

    return (
        <Container>
            <Navbar>
                <SPAW name={name} />
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Avalanche Forecast">
                <h1>
                    <Link to={`/forecasts/${name}`}>North Rockies</Link>
                    <Region name={name}>
                        {({ data }) =>
                            data ? (
                                <DisplayOnMap
                                    onClick={() => {
                                        onLocateClick(utils.geometry(data))
                                    }}
                                />
                            ) : null
                        }
                    </Region>
                </h1>
            </Header>
            <Body>
                <Content>
                    <NorthRockies />
                </Content>
            </Body>
        </Container>
    )
}

export default memo.static(NorthRockiesLayout)
