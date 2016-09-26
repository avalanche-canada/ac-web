import React, {PropTypes} from 'react'
import Contact from './Contact'
import Share from './Share'
import Follow from './Follow'
import Sidebar from './Sidebar'

export Sidebar from './Sidebar'
export Item from './Item'
export Header from './Header'
export Share from './Share'
export Follow from './Follow'
export Contact from './Contact'

CompleteSidebar.propTypes = {
    withContacting: PropTypes.bool,
    withSharing: PropTypes.bool,
    withFollowing: PropTypes.bool,
    children: PropTypes.node,
}

export default function CompleteSidebar({children, withContacting, withSharing, withFollowing}) {
    return (
        <Sidebar>
            {children}
            {withSharing && <Share />}
            {withFollowing && <Follow />}
            {withContacting && <Contact />}
        </Sidebar>
    )
}
