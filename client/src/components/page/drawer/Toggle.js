import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import Button, {SUBTILE} from 'components/button'
import {ChevronRight, ChevronLeft} from 'components/icons'
import SIDE, {LEFT, RIGHT} from './constants/sides'

const OPENED_ICONS = new Map([
    [LEFT, <ChevronLeft />],
    [RIGHT, <ChevronRight />],
])
const CLOSED_ICONS = new Map([
    [LEFT, <ChevronRight />],
    [RIGHT, <ChevronLeft />],
])

Toggle.propTypes = {
    open: PropTypes.bool.isRequired,
    side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
}

function Toggle({open = false, side = SIDE, onOpen, onClose}) {
    if (open && onClose) {
        return (
            <Button kind={SUBTILE} onClick={onClose} styleName='Toggle'>
                {OPENED_ICONS.get(side)}
            </Button>
        )
    } else if (!open && onOpen) {
        return (
            <Button kind={SUBTILE} onClick={onOpen} styleName='Toggle'>
                {CLOSED_ICONS.get(side)}
            </Button>
        )
    }

    return null
}

export default CSSModules(Toggle, styles)
