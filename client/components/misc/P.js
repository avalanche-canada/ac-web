import { DOM } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {
    compose,
    withHandlers,
    mapProps,
    withState,
    defaultProps,
    setPropTypes,
} from 'recompose'
import styles from './P.css'

export default compose(
    setPropTypes({
        children: PropTypes.string.isRequired,
        capAt: PropTypes.number,
    }),
    defaultProps({
        children: '',
        capAt: Infinity,
    }),
    withState('capAt', 'setCapAt', props => props.capAt),
    mapProps(({ capAt, children, title, ...props }) => {
        const capped = children.length > capAt

        return {
            ...props,
            children: capped ? children.substr(0, capAt) : children,
            styleName: capped ? 'Capped' : null,
            title: capped ? 'Click to read more' : title,
        }
    }),
    withHandlers({
        onClick: props => event => {
            event.preventDefault()

            props.setCapAt(Infinity)
        },
    }),
    CSSModules(styles)
)(DOM.p)
