import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import Collapse from 'components/collapse'
import { Expand } from 'components/button'
import styles from './Layer.css'

export default class Layer extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        icon: PropTypes.node,
        onClick: PropTypes.func.isRequired,
        children: PropTypes.element,
    }
    state = {
        expanded: false,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    get expanded() {
        return this.state.expanded
    }
    set expanded(expanded) {
        this.setState({ expanded })
    }
    get className() {
        const { visible } = this.props

        return this.classnames({
            Layer: !visible,
            'Layer--Visible': visible,
        })
    }
    handleExpandClick = event => {
        event.stopPropagation()

        this.expanded = !this.expanded
    }
    render() {
        const { title, icon, onClick, children } = this.props

        return (
            <div className={this.className}>
                <div className={styles.Header} onClick={onClick}>
                    {icon}
                    <span className={styles.Title}>{title}</span>
                    {children && (
                        <Expand
                            chevron
                            expanded={this.expanded}
                            onClick={this.handleExpandClick}
                        />
                    )}
                </div>
                {children && (
                    <Collapse collapsed={!this.expanded}>
                        <div style={STYLE_HACK}>{children}</div>
                    </Collapse>
                )}
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
