import React from 'react'
import {compose, withProps} from 'recompose'
import {neverUpdate} from 'compose'
import {Link} from 'react-router'
import {Sidebar, Contact, Follow, Share, Item, Header, RSSFeed} from 'components/sidebar'
import {Mailto, Phone} from 'components/misc'

export default compose(
    neverUpdate,
    withProps(() => {
        const {pathname, origin} = document.location
        const email = 'avalanche.safety@gov.ab.ca'

        return {
            children: [
                <Item>
                    This Avalanche Bulletin is produced by avalanche forecasters within the Government of Alberta, Kananaskis Country Public Safety Program.
                </Item>,
                <Header>Contact</Header>,
                <Item>
                    <Mailto email={email} title='Email the Kananaskis Country Public Safety Section' />
                </Item>,
                <Item>
                    <Phone phone='403-678-5508' ext='223' /> is the Public Safety office phone number (weekdays)
                </Item>,
                <Item>
                    <Phone phone='403-591-7755' /> is the dispatch office non-emergency line
                </Item>,
                <Item>
                    <Phone phone='911' /> for backcountry rescues and tell them you are in Kananaskis Country
                </Item>,
                <Header>More information</Header>,
                <Item>
                    <Link to='/weather'>Your daily Mountain Weather Forecast</Link>
                </Item>,
                <Item>
                    <Link to='/mountain-information-network/submit'>Submit a Mountain Information Report</Link>
                </Item>,
                <Item>
                    <Link to='/blogs'>Visit Avalanche Canada Blog</Link>
                </Item>,
                <Share />,
                <Follow urls={['https://www.facebook.com/KCPublicSafety']} />,
                <Contact email={email} title='Email the Kananaskis Country Public Safety Section' />,
                <RSSFeed url={`${origin}/api${pathname}.rss`} />,
            ]
        }
    })
)(Sidebar)
