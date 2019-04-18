import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useBoolean } from 'utils/react/hooks'
import { Expand } from 'components/button'
import Collapsible from 'components/collapsible'
import { WHITE } from 'constants/colors'
import styles from './Panel.css'

Panel.propTypes = {
    collapsible: PropTypes.bool,
    expanded: PropTypes.bool,
    header: PropTypes.node.isRequired,
    children: PropTypes.string.isRequired,
}

export default function Panel({
    header,
    collapsible = true,
    expanded = false,
    children,
}) {
    const [on, , , toggle] = useBoolean(expanded)
    const className = classNames(styles.Container, {
        Collapsible: collapsible,
    })

    return (
        <section className={className}>
            <header
                className={styles.Header}
                onClick={collapsible ? toggle : null}>
                {collapsible && (
                    <Expand
                        className={styles.Expand}
                        expanded={on}
                        iconProps={ICON_PROPS}
                    />
                )}
                <span className={styles.Title}>{header}</span>
            </header>
            <Collapsible expanded={on}>{children}</Collapsible>
        </section>
    )
}

const classNames = classnames.bind(styles)
const ICON_PROPS = {
    color: WHITE,
}
