import React, {PropTypes} from 'react'
import {compose, withState} from 'recompose'
import CSSModules from 'react-css-modules'
import {Collapse} from 'components/misc'
import {Expand} from 'components/button'
import {asValues} from 'constants/utils'
import styles from './Layer.css'

function K() {}

Layer.propTypes = {
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    children: PropTypes.element,
}

const {keys} = Object

// Little hack to allow accurate mesuring even when chlidren have
// margins (first and last children)
// http://stackoverflow.com/questions/9770248/div-height-with-child-margin
const STYLE = {
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
}

function Layer({title, active = true, onClick = K, icon, children, expanded, setExpanded}) {
    function handleClick(event) {
        event.stopPropagation()

        setExpanded(!expanded)
    }

    return (
        <div styleName={active ? 'Layer--Active' : 'Layer'}>
            <div styleName='Header' onClick={onClick}>
                {icon}
                <span styleName='Title'>{title}</span>
                {children &&
                    <Expand expanded={expanded} onClick={handleClick} chevron />
                }
            </div>
            {children &&
                <Collapse collapsed={!expanded}>
                    <div style={STYLE} >
                        {children}
                    </div>
                </Collapse>
            }
        </div>
    )
}

export default compose(
    withState('expanded', 'setExpanded', false)
)(CSSModules(Layer, styles))
