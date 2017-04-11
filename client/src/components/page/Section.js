import React, {createElement} from 'react'
import PropTypes from 'prop-types'
import {compose, onlyUpdateForKeys, lifecycle} from 'recompose'
import {withHash} from '/compose'
import CSSModules from 'react-css-modules'
import Headline from './Headline'
import styles from './Page.css'

Section.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    hash: PropTypes.string,
    headline: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5]),
}

// TODO: No header tag if there is no headline

function Section({title, headline, children, hash, level = 1}) {
    const header = `h${level + 1}`

    return (
        <section styleName='Section'>
            <header>
                {createElement(header, null,
                    hash ? <a href={`#${hash}`}>{title}</a> : title
                )}
                {headline && <Headline>{headline}</Headline>}
            </header>
            {children}
        </section>
    )
}

export default compose(
    withHash,
    onlyUpdateForKeys(['title', 'headline', 'children', 'hash']),
    CSSModules(styles),
)(Section)
