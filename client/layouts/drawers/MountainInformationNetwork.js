import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Container, Header, Body, Navbar, Close } from 'components/page/drawer'
import Shim from 'components/Shim'
import { Submission, Metadata, TabSet, Gallery } from 'layouts/products/min'
import { Loading } from 'components/text'
import { Report } from 'containers/min'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { point } from '@turf/helpers'

MountainInformationNetwork.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function MountainInformationNetwork({ id, onCloseClick, onLocateClick }) {
    return (
        <Report id={id}>
            {({ loading, data }) => (
                <Container>
                    <Navbar>
                        <Sponsor label={null} />
                        <Close onClick={onCloseClick} />
                    </Navbar>
                    <Header subject="Mountain Information Network">
                        <h1>
                            <Link
                                to={`/mountain-information-network/submissions/${id}`}>
                                {data?.title || (loading ? 'Loading...' : null)}
                            </Link>
                            {data && (
                                <DisplayOnMap
                                    onClick={() =>
                                        onLocateClick(point(data.lnglat))
                                    }
                                />
                            )}
                        </h1>
                    </Header>
                    <Body>
                        <Submission value={data}>
                            <Shim horizontal>
                                {loading && (
                                    <Loading>
                                        Loading Mountain Information Network
                                        reports...
                                    </Loading>
                                )}
                                <Metadata />
                            </Shim>
                            <Shim vertical>
                                <TabSet />
                            </Shim>
                            <Gallery />
                        </Submission>
                    </Body>
                </Container>
            )}
        </Report>
    )
}

export default memo(
    MountainInformationNetwork,
    (prev, next) => prev.id === next.id
)
