import {PropTypes} from 'react'
import {compose, setPropTypes, branch, renderNothing} from 'recompose'
import {Element} from 'compose'
import styles from './Navbar.css'

const Menu = Element({
    name: 'Menu',
    styles,
})

export default compose(
    setPropTypes({
        isOpened: PropTypes.bool,
        children: PropTypes.node.isRequired,
    }),
    branch(
        props => !props.isOpened,
        renderNothing,
    ),
)(Menu)
