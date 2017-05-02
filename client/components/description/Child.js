import PropTypes from 'prop-types'
import { compose, componentFromProp, setPropTypes, mapProps } from 'recompose'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import styles from './Description.css'

const Child = compose(
    setPropTypes({
        children: PropTypes.node.isRequired,
        component: PropTypes.string.isRequired,
        styleName: PropTypes.string.isRequired,
        block: PropTypes.bool,
        oneLiner: PropTypes.bool,
    }),
    mapProps(
        ({
            styleName,
            block = false,
            oneLiner = false,
            children,
            ...rest
        }) => ({
            ...rest,
            children,
            styleName: classNames(styleName, {
                Block: block,
                OneLiner: oneLiner,
            }),
        })
    )
)(componentFromProp('component'))

export default CSSModules(Child, styles, { allowMultiple: true })
