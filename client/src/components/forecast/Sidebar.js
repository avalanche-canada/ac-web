import React from 'react'
import PropTypes from 'prop-types'
import {onlyUpdateForKey} from '/compose'
import {compose, mapProps, setPropTypes} from 'recompose'
import {Link} from 'react-router'
import {Sidebar, Contact, Follow, Share, Item, RSSFeed, Print} from '/components/sidebar'
import {FORECASTERS} from '/constants/emails'

export default compose(
    setPropTypes({
        isPrintable: PropTypes.bool.isRequired,
    }),
    onlyUpdateForKey('isPrintable'),
    mapProps(({isPrintable, ...props}) => {
        const {pathname, origin} = document.location
        const children = [
            <Item>
                <Link to='/weather'>Your daily Mountain Weather Forecast</Link>
            </Item>,
            <Item>
                <Link to='/mountain-information-network/submit'>Submit a Mountain Information Report</Link>
            </Item>,
            <Item>
                <Link to='/blogs'>Visit our Blog</Link>
            </Item>,
            <Item>
                <Link to='/forecasts/archives'>Forecast Archive</Link>
            </Item>,
            <Follow />,
            <Share />,
            <Contact email={FORECASTERS} />,
            <RSSFeed url={`${origin}/api${pathname}.rss`} />,
        ]

        if (isPrintable) {
            children.push(<Print url={`${origin}/api${pathname}.html`} />)
        }

        return {
            ...props,
            children
        }
    })
)(Sidebar)
