import React, {PropTypes} from 'react'
import Contact from './Contact'
import Share from './Share'
import Follow from './Follow'
import Sidebar from './Sidebar'

export Sidebar from './Sidebar'
export Item from './Item'
export Header from './Header'

CompleteSidebar.propTypes = {
    noContacting: PropTypes.bool,
    noSharing: PropTypes.bool,
    noFollowing: PropTypes.bool,
    children: PropTypes.node,
}

export default function CompleteSidebar({children, noContacting, noSharing, noFollowing}) {
    return (
        <Sidebar>
            {children}
            {noSharing || <Share />}
            {noFollowing || <Follow />}
            {noContacting || <Contact />}
        </Sidebar>
    )
}
