import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Consumer } from './Context'
import { Sidebar, Contact, Follow, Share, Item } from 'components/sidebar'
import * as utils from 'utils/hzr'
import { FORECASTERS } from 'constants/emails'

export default class HotZoneReportSidebar extends Component {
    static propTypes = {
        shareable: PropTypes.bool,
        children: PropTypes.node,
    }
    render() {
        const { shareable, children, ...props } = this.props

        return (
            <Sidebar {...props}>
                {children}
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
                {shareable && (
                    <Consumer>
                        {report =>
                            report && <Share url={utils.shareUrl(report)} />
                        }
                    </Consumer>
                )}
                <Contact email={FORECASTERS} />
            </Sidebar>
        )
    }
}
