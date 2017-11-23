import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Panel.css'
import Collapse from 'components/collapse'
import { Expand } from 'components/button'
import { titleOf } from 'utils/string'

export const SIMPLE = 'Simple'
export const INVERSE = 'Inverse'

export default class Panel extends PureComponent {
    static propTypes = {
        expandable: PropTypes.bool,
        expanded: PropTypes.bool,
        header: PropTypes.string.isRequired,
        theme: PropTypes.oneOf([INVERSE, SIMPLE]),
        children: PropTypes.node.isRequired,
    }
    static defaultProps = {
        expandable: false,
        theme: SIMPLE,
        expanded: false,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
        this.state = {
            expanded: props.expanded,
        }
    }
    get expanded() {
        return this.state.expanded
    }
    set expanded(expanded) {
        this.setState({ expanded })
    }
    get className() {
        const { theme, expandable } = this.props

        return this.classnames({
            [`Container--${theme}--Expandable`]: expandable,
            [`Container--${theme}`]: !expandable,
        })
    }
    componentWillReceiveProps({ expanded }) {
        if (expanded !== this.expanded) {
            this.expanded = expanded
        }
    }
    handleHeaderClick = () => {
        if (!this.props.expandable) {
            return
        }

        this.expanded = !this.expanded
    }
    render() {
        const { expandable, header, children } = this.props

        return (
            <div className={this.className}>
                <header
                    className={styles.Header}
                    onClick={this.handleHeaderClick}>
                    {expandable && (
                        <Expand
                            className={styles.Expand}
                            expanded={this.expanded}
                        />
                    )}
                    <span className={styles.Title} title={titleOf(header)}>
                        {header}
                    </span>
                </header>
                <div className={styles.Content}>
                    {expandable ? (
                        <Collapse collapsed={!this.expanded}>
                            <div style={STYLE_HACK}>{children}</div>
                        </Collapse>
                    ) : (
                        children
                    )}
                </div>
            </div>
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
