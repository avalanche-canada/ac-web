import React from 'react'
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
import { useReport } from 'hooks/async/min'
import { FormattedMessage } from 'react-intl'
import { useFlyTo, useSecondaryDrawer } from 'layouts/main/drawers/hooks'
import { useName } from 'constants/products/names'
import { MOUNTAIN_INFORMATION_NETWORK } from 'constants/products'

export default function MountainInformationNetwork() {
    const { id, close } = useSecondaryDrawer()

    return (
        <Provider value={useReport(id)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={close} />
            </Navbar>
            <Header subject={useName(MOUNTAIN_INFORMATION_NETWORK)}>
                <Pending>
                    <Loading as="h1" />
                </Pending>
                <Found>
                    <ReportTitle />
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
                                    id,
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
function ReportTitle({ payload }) {
    const flyTo = useFlyTo()
    function handleLocationClick() {
        flyTo(payload.lnglat)
    }

    return (
        <h1>
            <Link to={submission(payload.subid)}>{payload.title}</Link>
            <DisplayOnMap onClick={handleLocationClick} />
        </h1>
    )
}
