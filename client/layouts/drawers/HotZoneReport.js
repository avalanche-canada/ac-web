import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import * as Hzr from 'layouts/products/hzr'
import {
    Navbar,
    Header,
    Body,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import { Loading } from 'components/text'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { useAdvisoryMetadata } from 'hooks/async/features'
import { hotZone } from 'prismic/params'
import * as utils from 'utils/hzr'
import { useDocument } from 'prismic/hooks'
import { useIntl } from 'react-intl'

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
    const [report, reportPending] = useDocument(hotZone.report(name))
    const intl = useIntl()

    function title(report, docPending) {
        if (areaPending || docPending) {
            return intl.formatMessage({
                defaultMessage: 'Loading...',
                description: 'Layout drawers/HotZoneReport',
            })
        }

        return utils.title({ region: name, report, hotZone: area })
    }

    return (
        <Fragment>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject={intl.formatMessage({
                defaultMessage: 'Avalanche Advisory',
                description: 'Layout drawers/HotZoneReport',
            })}>
                <h1>
                    {report ? (
                        <Link to={`/advisories/${name}`}>
                            {title(report, reportPending)}
                        </Link>
                    ) : (
                            <span>{title(report, reportPending)}</span>
                        )}
                    {area && (
                        <DisplayOnMap
                            onClick={() => onLocateClick(utils.geometry(area))}
                        />
                    )}
                </h1>
            </Header>
            <Body>
                {reportPending ? (
                    <Shim horizontal>
                        <Loading />
                    </Shim>
                ) : (
                        <Hzr.Report value={report}>
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
        </Fragment>
    )
}
