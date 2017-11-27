import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import FragmentIdentifier from 'router/FragmentIdentifier'
import Headline from './Headline'
import styles from './Page.css'

// TODO: No header tag if there is no headline

export default class Section extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
        hash: PropTypes.string,
        headline: PropTypes.string,
        level: PropTypes.oneOf([1, 2, 3, 4, 5]),
    }
    get children() {
        const { hash, title } = this.props

        return hash ? (
            <FragmentIdentifier hash={hash}>{title}</FragmentIdentifier>
        ) : (
            title
        )
    }
    render() {
        const { headline, children, level = 1 } = this.props
        const header = `h${level + 1}`

        return (
            <section className={styles.Section}>
                <header>
                    {createElement(header, null, this.children)}
                    {headline && <Headline>{headline}</Headline>}
                </header>
                {children}
            </section>
        )
    }
}
