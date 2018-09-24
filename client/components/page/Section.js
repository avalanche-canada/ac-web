import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { FragmentIdentifier } from 'router'
import Headline from './Headline'
import { Ribbon } from 'components/misc'
import styles from './Page.css'

// TODO: No header tag if there is no headline

export default class Section extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.node.isRequired,
        ribbon: PropTypes.string,
        hash: PropTypes.string,
        headline: PropTypes.string,
        level: PropTypes.oneOf([1, 2, 3, 4, 5]),
    }
    static defaultProps = {
        level: 1,
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
        const { headline, children, level, ribbon } = this.props
        const header = `h${level + 1}`

        return (
            <section className={styles.Section}>
                {ribbon ? (
                    <Ribbon caption={ribbon}>{this.children}</Ribbon>
                ) : (
                    <header>
                        {createElement(header, null, this.children)}
                        {headline && <Headline>{headline}</Headline>}
                    </header>
                )}
                {children}
            </section>
        )
    }
}
