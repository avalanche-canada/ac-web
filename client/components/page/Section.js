import React, { memo, createElement } from 'react'
import PropTypes from 'prop-types'
import { FragmentIdentifier } from 'router'
import Headline from './Headline'
import { Ribbon } from 'components/misc'
import styles from './Page.css'

// TODO: No header tag if there is no headline

Section.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    ribbon: PropTypes.string,
    hash: PropTypes.string,
    headline: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5]),
}

function Section({ headline, children, level = 1, ribbon, hash, title }) {
    const header = `h${level + 1}`

    if (hash) {
        title = <FragmentIdentifier hash={hash}>{title}</FragmentIdentifier>
    }

    return (
        <section className={styles.Section}>
            {ribbon ? (
                <Ribbon caption={ribbon}>{title}</Ribbon>
            ) : (
                <header>
                    {createElement(header, null, title)}
                    {headline && <Headline>{headline}</Headline>}
                </header>
            )}
            {children}
        </section>
    )
}

export default memo(Section)
