import React from 'react'
import PropTypes from 'prop-types'
import {compose, setPropTypes, defaultProps, withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import Page from './Page'
import Content from './Content'
import styles from './Page.css'

export default compose(
    setPropTypes({
        children: PropTypes.node.isRequired,
    }),
    defaultProps({
        styleName: 'Error',
    }),
    withProps(({children}) => ({
        children: (
            <Content>
                {children}
            </Content>
        )
    })),
    CSSModules(styles),
)(Page)
