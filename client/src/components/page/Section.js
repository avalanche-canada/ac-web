import React, {PropTypes, createElement} from 'react'
import {compose, onlyUpdateForKeys, lifecycle} from 'recompose'
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
// TODO: Finish implementing hash. Look at GitHub

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
    onlyUpdateForKeys(['title', 'headline', 'children', 'hash']),
    CSSModules(styles),
)(Section)
