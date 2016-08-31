import React, { PropTypes, createElement} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps, withProps, defaultProps} from 'recompose'
import {First as FirstIcon, Previous as PreviousIcon, Next as NextIcon, Last as LastIcon} from 'components/icons'
import {Link} from 'react-router'

Paginate.propTypes = {
    children: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
}

export default function Paginate({location, children}) {
    return (
        <Link to={location}>
            {children}
        </Link>
    )
}

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
        })
    )(Paginate)
}

export const First = paginate('First')
export const Previous = paginate('Previous')
export const Next = paginate('Next')
export const Last = paginate('Last')
