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
import { FormattedMessage, useIntl } from 'react-intl'

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
    const intl = useIntl()
    return (
        <Provider value={useReport(id)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header
                subject={intl.formatMessage({
                    defaultMessage: 'Mountain Information Network',
                    description: 'Layout drawers/MountainInformationNetwork',
                })}>
                <Pending>
                    <Loading as="h1" />
                </Pending>
                <Found>
                    <ReportTitle onLocateClick={onLocateClick} />
                </Found>
                <NotFound>
                    <Warning as="h1">
                        <FormattedMessage
                            description="Layout drawers/MountainInformationNetwork"
                            defaultMessage="Report not found."
                        />
                    </Warning>
                </NotFound>
            </Header>
            <Body>
                <Shim horizontal>
                    <Pending>
                        <Loading>
                            <FormattedMessage
                                description="Layout drawers/MountainInformationNetwork"
                                defaultMessage="Loading Mountain Information Network report..."
                            />
                        </Loading>
                    </Pending>
                    <NotFound>
                        <p>
                            <FormattedMessage
                                description="Layout drawers/MountainInformationNetwork"
                                defaultMessage="Report with id {id} has not been found."
                                values={{
                                    id
                                }}
                            />
                        </p>
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
