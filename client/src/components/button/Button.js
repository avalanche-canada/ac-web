import React, {PropTypes, DOM} from 'react'
import {compose, setPropTypes, setDisplayName, mapProps, defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Button.css'
import classNames from 'classnames'
import KIND, {ALL as KINDS} from './kinds'

export default compose(
    setDisplayName('Button'),
    setPropTypes({
        children: PropTypes.node,
        active: PropTypes.bool,
        shadow: PropTypes.bool,
        kind: PropTypes.oneOf(Array.from(KINDS)),
        icon: PropTypes.node,
    }),
    defaultProps({
        kind: KIND,
        active: false,
        shadow: false,
    }),
    mapProps(({icon, active, shadow, kind, ...props}) => {
        const styleName = classNames({
            [kind]: true,
            Active: active,
            Shadow: shadow,
        })

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
    CSSModules(styles, {allowMultiple: true})
)(DOM.button)
