import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Sidebar, Contact, Follow, Share, Item } from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'

export default class HotZoneReportSidebar extends Component {
    static propTypes = {
        shareUrl: PropTypes.string.isRequired,
        children: PropTypes.node,
    }
    shouldComponentUpdate({ shareUrl }) {
        return shareUrl !== this.props.shareUrl
    }
    render() {
        const { shareUrl, children, ...props } = this.props

        return (
            <Sidebar {...props}>
                {this.props.children}
                <Item>
                    <Link to="/weather">
                        Your daily Mountain Weather Forecast
                    </Link>
                </Item>
                <Item>
                    <Link to="/mountain-information-network/submit">
                        Submit a Mountain Information Report
                    </Link>
                </Item>
                <Item>
                    <Link to="/blogs">Visit our Blog</Link>
                </Item>
                <Item>
                    <Link to="/hot-zone-reports/archives">HotZone Archive</Link>
                </Item>
                <Follow />
                <Share url={shareUrl} />
                <Contact email={FORECASTERS} />
            </Sidebar>
        )
    }
}
