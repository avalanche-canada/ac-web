import React, {PropTypes, DOM} from 'react'
import {withRouter} from 'react-router'
import CSSModules from 'react-css-modules'
import {compose, defaultProps, withHandlers} from 'recompose'
import styles from './Misc.css'

export default compose(
    withRouter,
    defaultProps({
        styleName: 'GoBack',
        href: '#',
    }),
    withHandlers({
        onClick: props => event => {
            event.preventDefault()
            props.router.goBack()
        }
    }),
)(CSSModules(DOM.a, styles))
