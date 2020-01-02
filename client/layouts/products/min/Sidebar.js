import React from 'react'
import { Link } from '@reach/router'
import { Sidebar, Contact, Follow, Share, Item } from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'
import * as utils from 'utils/min'

export default function MountainInformationNetworkSidebar({ children }) {
    return (
        <Sidebar>
            {children}
            <Item>
                <Link to="/weather">Your daily Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to={utils.path('submit')}>
                    Submit a Mountain Information Report
                </Link>
            </Item>
            <Item>
                <Link to={utils.submission()}>Visit all submitted reports</Link>
            </Item>
            <Item>
                <Link to="/blogs">Visit our Blog</Link>
            </Item>
            <Follow />
            <Share />
            <Contact email={FORECASTERS} />
        </Sidebar>
    )
}
