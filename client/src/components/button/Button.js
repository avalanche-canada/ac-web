import React, { PropTypes, DOM} from 'react'
import {compose, setPropTypes, setDisplayName, mapProps, defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Button.css'
import * as KINDS from './kinds'
import {asValues} from 'constants/utils'

export default compose(
    setDisplayName('Button'),
    setPropTypes({
        children: PropTypes.node,
        active: PropTypes.bool,
        kind: PropTypes.oneOf(asValues(KINDS)),
        icon: PropTypes.node,
    }),
    defaultProps({
        kind: KINDS.default,
        active: false,
    }),
    mapProps(({icon, active, kind, ...props}) => {
        const styleName = `${kind} ${active ? 'Active' : ''}`

        if (!icon) {
            return {...props, styleName}
        }

        const {children} = props

        return {
            ...props,
            styleName: `${styleName} ${children ? '' : 'IconOnly'}`,
            children: (
                <div styleName='IconContainer'>
                    {icon}
                    {typeof children === 'string' ?
                        <span>{children}</span> :
                        children
                    }
                    </div>
            )
        }
    }),
    CSSModules(styles, { allowMultiple: true })
)(DOM.button)
