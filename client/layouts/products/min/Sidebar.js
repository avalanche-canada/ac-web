import React from 'react'
import { Link } from '@reach/router'
import { Sidebar, Contact, Follow, Share, Item } from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'
import * as utils from 'utils/min'
import { FormattedMessage } from 'react-intl'

export default function MountainInformationNetworkSidebar({ children }) {
    return (
        <Sidebar>
            {children}
            <Item>
                <Link to="/weather">
                    <FormattedMessage
                        description="Layout products/min/Sidebar"
                        defaultMessage="Your daily Mountain Weather Forecast"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={utils.path('submit')}>
                    <FormattedMessage
                        description="Layout products/min/Sidebar"
                        defaultMessage="Submit a Mountain Information Report"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={utils.submission()}>
                    <FormattedMessage
                        description="Layout products/min/Sidebar"
                        defaultMessage="Visit all submitted reports"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/blogs">
                    <FormattedMessage
                        description="Layout products/min/Sidebar"
                        defaultMessage="Visit our Blog"
                    />
                </Link>
            </Item>
            <Follow />
            <Share />
            <Contact email={FORECASTERS} />
        </Sidebar>
    )
}
