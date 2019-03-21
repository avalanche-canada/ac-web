import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import * as Hzr from 'layouts/products/hzr'
import { Container, Navbar, Header, Body, Close } from 'components/page/drawer'
import { Loading } from 'components/text'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { Document } from 'prismic/containers'
import { HotZone } from 'containers/features'
import { hotZone } from 'prismic/params'
import * as utils from 'utils/hzr'

HotZoneReportDrawer.propTypes = {
    name: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function HotZoneReportDrawer({ name, onCloseClick, onLocateClick }) {
    return (
        <Document {...hotZone.report(name)}>
            {({ document, loading }) => (
                <Container>
                    <Navbar>
                        <Sponsor label={null} />
                        <Close onClick={onCloseClick} />
                    </Navbar>
                    <Header subject="Avalanche Advisory">
                        <HotZone name={name}>
                            {({ data }) => {
                                const title = utils.title({
                                    loading,
                                    report: document,
                                    hotZone: data,
                                })

                                return (
                                    <h1>
                                        {document ? (
                                            <Link to={`/advisories/${name}`}>
                                                {title}
                                            </Link>
                                        ) : (
                                            <span>{title}</span>
                                        )}
                                        <DisplayOnMap
                                            onClick={() =>
                                                onLocateClick(
                                                    utils.geometry(data)
                                                )
                                            }
                                        />
                                    </h1>
                                )
                            }}
                        </HotZone>
                    </Header>
                    <Body>
                        {loading ? (
                            <Shim horizontal>
                                <Loading />
                            </Shim>
                        ) : (
                            <Hzr.Report value={document}>
                                <Shim horizontal>
                                    <Hzr.Metadata shareable />
                                    <Hzr.Header />
                                </Shim>
                                <Hzr.Gallery />
                                <Hzr.CriticalFactors />
                                <Hzr.TerrainAndTravelAdvice />
                                <Hzr.TerrainAdviceSet />
                                <Hzr.Footer />
                            </Hzr.Report>
                        )}
                    </Body>
                </Container>
            )}
        </Document>
    )
}

export default memo(
    HotZoneReportDrawer,
    (prev, next) => prev.name === next.name
)
