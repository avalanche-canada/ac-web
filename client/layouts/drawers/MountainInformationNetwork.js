import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import {
    Header,
    Body,
    Navbar,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import Shim from 'components/Shim'
import { Submission, Metadata, TabSet, Gallery } from 'layouts/products/min'
import { Loading, Warning } from 'components/text'
import { submission } from 'utils/min'
import Sponsor from 'layouts/Sponsor'
import { Provider, Pending, Found, NotFound } from 'contexts/async'
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
    return (
        <Provider value={useReport(id)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Mountain Information Network">
                <Pending>
                    <Loading as="h1" />
                </Pending>
                <Found>
                    <ReportTitle onLocateClick={onLocateClick} />
                </Found>
                <NotFound>
                    <Warning as="h1">Report not found.</Warning>
                </NotFound>
            </Header>
            <Body>
                <Shim horizontal>
                    <Pending>
                        <Loading>
                            Loading Mountain Information Network report...
                        </Loading>
                    </Pending>
                    <NotFound>
                        <p>Report with id {id} has not been found.</p>
                    </NotFound>
                </Shim>
                <Found>
                    {report => (
                        <Submission value={report}>
                            <Shim horizontal>
                                <Metadata />
                            </Shim>
                            <Shim vertical>
                                <TabSet />
                            </Shim>
                            <Gallery />
                        </Submission>
                    )}
                </Found>
            </Body>
        </Provider>
    )
}

// Utils
function ReportTitle({ onLocateClick, payload }) {
    return (
        <h1>
            <Link to={submission(payload.subid)}>{payload.title}</Link>
            <DisplayOnMap
                onClick={() => onLocateClick(point(payload.lnglat))}
            />
        </h1>
    )
}
