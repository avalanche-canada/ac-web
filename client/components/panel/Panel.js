import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Toggle } from 'react-powerplug'
import Collapse from 'components/collapse'
import { Expand } from 'components/button'
import styles from './Panel.css'

export const SIMPLE = 'Simple'
export const INVERSE = 'Inverse'

export default class Panel extends PureComponent {
    static propTypes = {
        expandable: PropTypes.bool,
        expanded: PropTypes.bool,
        onExpandedChange: PropTypes.func,
        header: PropTypes.node.isRequired,
        theme: PropTypes.oneOf([INVERSE, SIMPLE]),
        children: PropTypes.string.isRequired,
    }
    static defaultProps = {
        expandable: false,
        theme: SIMPLE,
        expanded: false,
    }
    classnames = classnames.bind(styles)
    get className() {
        const { theme, expandable } = this.props

        return this.classnames({
            [`Container--${theme}--Expandable`]: expandable,
            [`Container--${theme}`]: !expandable,
        })
    }
    renderContent = ({ on, toggle }) => {
        const { expandable, children } = this.props

        return (
            <div className={this.className}>
                <header
                    className={styles.Header}
                    onClick={expandable ? toggle : null}>
                    {expandable && (
                        <Expand className={styles.Expand} expanded={on} />
                    )}
                    <span className={styles.Title}>{this.props.header}</span>
                </header>
                <div className={styles.Content}>
                    {expandable ? (
                        <Collapse collapsed={!on}>
                            <div style={STYLE_HACK}>{children}</div>
                        </Collapse>
                    ) : (
                        children
                    )}
                </div>
            </div>
        )
    }
    render() {
        const { expanded, onExpandedChange } = this.props

        return (
            <Toggle initial={expanded} onChange={onExpandedChange}>
                {this.renderContent}
            </Toggle>
        )
    }
}

// Little hack to allow accurate mesuring even when chlidren have
// margins (first and last children)
// http://stackoverflow.com/questions/9770248/div-height-with-child-margin
const STYLE_HACK = {
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
}
