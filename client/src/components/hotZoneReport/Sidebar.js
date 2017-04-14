import React from 'react'
import PropTypes from 'prop-types'
import {compose, mapProps, setPropTypes} from 'recompose'
import {onlyUpdateForKey} from '~/compose'
import {Link} from 'react-router'
import {Sidebar, Contact, Follow, Share, Item} from '~/components/sidebar'
import {FORECASTERS} from 'constants/emails'

export default compose(
    setPropTypes({
        shareUrl: PropTypes.string.isRequired,
    }),
    onlyUpdateForKey('shareUrl'),
    mapProps(({shareUrl, ...props}) => ({
        ...props,
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
            <Item>
                <Link to='/hot-zone-reports/archives'>HotZone Archive</Link>
            </Item>,
            <Follow />,
            <Share url={shareUrl} />,
            <Contact email={FORECASTERS} />,
        ]
    })),
)(Sidebar)
