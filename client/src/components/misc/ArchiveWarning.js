import React, {PropTypes, createElement} from 'react'
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
    return (
        <Alert type={WARNING}>
            {children}
            {createElement(Link, {
                ...nowcast,
                styleName: 'Today'
            })}
            <div styleName='Links'>
                {previous && createElement(Link, {
                    ...previous,
                    styleName: 'Previous'
                })}
                {next && createElement(Link, {
                    ...next,
                    styleName: 'Next'
                })}
            </div>
        </Alert>
    )
}

export default CSSModules(ArchiveWarning, styles)
