import React from 'react'
import {compose, withProps} from 'recompose'
import {Sidebar, Contact, Follow, Share} from 'components/sidebar'
import {FORECASTERS} from 'constants/emails'

const contact = <Contact email={FORECASTERS} />
const share = <Share />
const follow = <Follow />

export default compose(
    withProps({
        children: [
            follow,
            share,
            contact,
        ]
    })
)(Sidebar)
