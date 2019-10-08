import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import * as Hzr from 'layouts/products/hzr'
import { Container, Navbar, Header, Body, Close } from 'components/page/drawer'
import { Loading } from 'components/text'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { Document } from 'prismic/containers'
import { useAdvisoryMetadata } from 'containers/features'
import { hotZone } from 'prismic/params'
import * as utils from 'utils/hzr'

HotZoneReportDrawer.propTypes = {
    name: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function HotZoneReportDrawer({
    name,
    onCloseClick,
    onLocateClick,
}) {
    const [area, areaPending] = useAdvisoryMetadata(name)
    function title(report, docPending) {
        if (areaPending || docPending) {
            return 'Loading...'
        }

        return utils.title({ region: name, report, hotZone: area })
    }

    return (
        <Document {...hotZone.report(name)}>
            {({ document, pending }) => (
                <Container>
                    <Navbar>
                        <Sponsor label={null} />
                        <Close onClick={onCloseClick} />
                    </Navbar>
                    <Header subject="Avalanche Advisory">
                        <h1>
                            {document ? (
                                <Link to={`/advisories/${name}`}>
                                    {title(document, pending)}
                                </Link>
                            ) : (
                                <span>{title(document, pending)}</span>
                            )}
                            {area && (
                                <DisplayOnMap
                                    onClick={() =>
                                        onLocateClick(utils.geometry(area))
                                    }
                                />
                            )}
                        </h1>
                    </Header>
                    <Body>
                        {pending ? (
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
