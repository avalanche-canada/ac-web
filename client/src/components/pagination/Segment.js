import React, {PropTypes, createElement} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps, withProps, defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './Pagination.css'
import {
    First as FirstIcon,
    Previous as PreviousIcon,
    Next as NextIcon,
    Last as LastIcon
} from 'components/icons'

Segment.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
}

function Segment({location = '#', onClick, isActive, children}) {
    const styleName = isActive ? 'Segment' : 'Segment--Active'

    return (
        <Link to={location} onClick={onClick} styleName={styleName} >
            {children}
        </Link>
    )
}

Segment = CSSModules(Segment, styles)

const Icons = new Map([
    ['First', <FirstIcon inverse />],
    ['Previous', <PreviousIcon inverse />],
    ['Next', <NextIcon inverse />],
    ['Last', <LastIcon inverse />],
])

function paginate(name) {
    return compose(
        setDisplayName(name),
        withProps({
            children: Icons[name]
        }),
    )(Segment)
}

export default Segment
export const First = paginate('First')
export const Previous = paginate('Previous')
export const Next = paginate('Next')
export const Last = paginate('Last')
