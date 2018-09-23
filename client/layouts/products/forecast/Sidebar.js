import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import {
    Sidebar as Base,
    Contact,
    Follow,
    Share,
    Item,
    RSSFeed,
    Print,
} from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'

export default class Sidebar extends Component {
    static propTypes = {
        isPrintable: PropTypes.bool.isRequired,
    }
    shouldComponentUpdate({ isPrintable }) {
        return isPrintable !== this.props.isPrintable
    }
    render() {
        const { isPrintable, ...props } = this.props
        const { pathname, origin } = document.location

        return (
            <Base {...props}>
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
                    <Link to="/forecasts/archives">Forecast Archive</Link>
                </Item>
                <Follow />
                <Share />
                <Contact email={FORECASTERS} />
                <RSSFeed url={`${origin}/api${pathname}.rss`} />
                {isPrintable && <Print url={`${origin}/api${pathname}.html`} />}
            </Base>
        )
    }
}
