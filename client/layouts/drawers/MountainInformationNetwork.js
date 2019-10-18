import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Container, Header, Body, Navbar, Close } from 'components/page/drawer'
import Shim from 'components/Shim'
import { Submission, Metadata, TabSet, Gallery } from 'layouts/products/min'
import { Loading } from 'components/text'
import { path } from 'utils/min'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { point } from '@turf/helpers'
import { useReport } from 'hooks/async/min'

MountainInformationNetwork.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function MountainInformationNetwork({
    id,
    onCloseClick,
    onLocateClick,
}) {
    const [report, pending] = useReport(id)

    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Mountain Information Network">
                <h1>
                    <Link to={path(id)}>
                        {report?.title || (pending ? 'Loading...' : null)}
                    </Link>
                    {report && (
                        <DisplayOnMap
                            onClick={() => onLocateClick(point(report.lnglat))}
                        />
                    )}
                </h1>
            </Header>
            <Body>
                <Submission value={report}>
                    <Shim horizontal>
                        {pending && (
                            <Loading>
                                Loading Mountain Information Network reports...
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
    )
}
