import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Contact, Follow, Share, Item } from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'

export default function MountainInformationNetworkSidebar({ children }) {
    return (
        <Sidebar>
            {children}
            <Item>
                <Link to="/weather">Your daily Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to="/mountain-information-network/submit">
                    Submit a Mountain Information Report
                </Link>
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
