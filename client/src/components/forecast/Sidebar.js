import React from 'react'
import {neverUpdate} from 'compose'
import {compose, withProps} from 'recompose'
import {Link} from 'react-router'
import {Sidebar, Contact, Follow, Share, Item, RSSFeed} from 'components/sidebar'
import {FORECASTERS} from 'constants/emails'

export default compose(
    neverUpdate,
    withProps(() => {
        const {pathname, origin} = document.location

        return {
            children: [
                <Item>
                    <Link to='/weather'>Your daily Mountain Weather Forecast</Link>
                </Item>,
                <Item>
                    <Link to='/mountain-information-network/submit'>Submit a Mountain Information Report</Link>
                </Item>,
                <Item>
                    <Link to='/blogs'>Visit our Blog</Link>
                </Item>,
                <Follow />,
                <Share />,
                <Contact email={FORECASTERS} />,
                <RSSFeed url={`${origin}/api${pathname}.rss`} />,
            ]
        }
    })
)(Sidebar)
