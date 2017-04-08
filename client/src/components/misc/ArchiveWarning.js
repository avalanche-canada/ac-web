import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import Alert, {WARNING} from 'components/alert'
import {DateElement} from 'components/misc'
import styles from './ArchiveWarning.css'

const LinkPropType = PropTypes.shape({
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
})

ArchiveWarning.propTypes = {
    nowcast: LinkPropType,
    previous: LinkPropType,
    next: LinkPropType,
    children: PropTypes.number.isRequired,
}

function ArchiveWarning({nowcast, previous, next, children}) {
    const links = []

    if (previous) {
        links.push(<Link key='previous' {...previous} styleName='Previous' />)
    }

    if (next) {
        links.push(<Link key='next' {...next} styleName='Next' />)
    }

    return (
        <Alert type={WARNING}>
            {children}
            <Link styleName='Today' {...nowcast} />
            <div styleName='Links'>
                {links}
            </div>
        </Alert>
    )
}

export default CSSModules(ArchiveWarning, styles)
