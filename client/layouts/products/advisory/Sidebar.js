import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import { Sidebar, Contact, Follow, Share, Item } from 'components/sidebar'
import * as utils from 'utils/advisory'
import { FORECASTERS } from 'constants/emails'

AdvisorySidebar.propTypes = {
    shareable: PropTypes.bool,
    children: PropTypes.node,
}

export default function AdvisorySidebar({ shareable, children, ...props }) {
    return (
        <Sidebar {...props}>
            {children}
            <Item>
                <Link to="/weather">
                    <FormattedMessage
                        description="Layout products/advisory/Sidebar"
                        defaultMessage="Your daily Mountain Weather Forecast"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/mountain-information-network/submit">
                    <FormattedMessage
                        description="Layout products/advisory/Sidebar"
                        defaultMessage="Submit a Mountain Information Report"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/blogs">
                    <FormattedMessage
                        description="Layout products/advisory/Sidebar"
                        defaultMessage="Visit our Blog"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/advisories/archives">
                    <FormattedMessage
                        description="Layout products/advisory/Sidebar"
                        defaultMessage="Avalanche Advisory Archive"
                    />
                </Link>
            </Item>
            <Follow />
            {shareable && <ShareReport />}
            <Contact email={FORECASTERS} />
        </Sidebar>
    )
}

function ShareReport() {
    const report = useReport()

    return report ? <Share url={utils.shareUrl(report)} /> : null
}
