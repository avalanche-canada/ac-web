import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { compose, withState, withHandlers, onlyUpdateForKeys } from 'recompose'
import styles from './Panel.css'
import { Collapse } from '~/components/misc'
import { Expand } from '~/components/button'
import { titleOf } from '~/utils/string'

export const SIMPLE = 'Simple'
export const INVERSE = 'Inverse'

Panel.propTypes = {
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    header: PropTypes.string.isRequired,
    theme: PropTypes.oneOf([INVERSE, SIMPLE]),
    children: PropTypes.node.isRequired,
    onHeaderClick: PropTypes.func.isRequired,
}

// Little hack to allow accurate mesuring even when chlidren have
// margins (first and last children)
// http://stackoverflow.com/questions/9770248/div-height-with-child-margin
const STYLE = {
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
}

function Panel({
    expandable = false,
    header,
    theme = SIMPLE,
    expanded = false,
    onHeaderClick,
    children,
}) {
    const styleName = expandable
        ? `Container--${theme}--Expandable`
        : `Container--${theme}`

    return (
        <div styleName={styleName}>
            <header styleName="Header" onClick={onHeaderClick}>
                {expandable &&
                    <Expand styleName="Expand" expanded={expanded} />}
                <span styleName="Title" title={titleOf(header)}>
                    {header}
                </span>
            </header>
            <div styleName="Content">
                {expandable
                    ? <Collapse collapsed={!expanded}>
                          <div style={STYLE}>
                              {children}
                          </div>
                      </Collapse>
                    : children}
            </div>
        </div>
    )
}

export default compose(
    onlyUpdateForKeys(['expanded', 'children', 'header', 'children']),
    withState('expanded', 'setExpanded', props => props.expanded),
    withHandlers({
        onHeaderClick: props => () => {
            if (!props.expandable) {
                return
            }

            props.setExpanded(!props.expanded)
        },
    }),
    CSSModules(styles)
)(Panel)
