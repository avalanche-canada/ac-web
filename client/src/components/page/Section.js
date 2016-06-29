import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import Headline from './Headline'
import styles from './Page.css'

Section.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    title: PropTypes.string.isRequired,
    headline: PropTypes.string,
    level: PropTypes.oneOf([2, 3, 4, 5, 6]),
}

// TODO No header tag if there is no headline

function Section({ title, headline, children, level = 2 }) {
    const header = `h${level}`

    return (
        <section styleName='Section'>
            <header>
                {createElement(header, null, title)}
                {headline && <Headline>{headline}</Headline>}
            </header>
            {children}
        </section>
    )
}

export default CSSModules(Section, styles)
