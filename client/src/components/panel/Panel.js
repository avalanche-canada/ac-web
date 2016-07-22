import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import { compose, withState } from 'recompose'
import styles from './Panel.css'
import {Collapse} from 'components/misc'
import {Expand} from 'components/button'

Panel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    header: PropTypes.string.isRequired,
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

function Panel({ expandable = false, header, expanded = false, setExpanded, children }) {
    const styleName = expandable ? 'Header--Expandable' : 'Header'
    function handleClick() {
        if (!expandable) {
            return
        }

        setExpanded(!expanded)
    }

    return (
        <div styleName='Container'>
            <header styleName={styleName} onClick={handleClick}>
                {expandable &&
                    <Expand expanded={expanded} onClick={handleClick} />
                }
                {header}
            </header>
            <div styleName='Content'>
                {expandable ?
                    <Collapse collapsed={!expanded}>
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
    withState('expanded', 'setExpanded', props => props.expanded)
)(CSSModules(Panel, styles))
