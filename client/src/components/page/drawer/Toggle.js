import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import Button, {SUBTILE} from 'components/button'
import {ChevronRight, ChevronLeft} from 'components/icons'
import SIDE, {LEFT, RIGHT} from './constants/sides'

function K() {}

const ICONS = new Map([
    [true, new Map([
        [LEFT, <ChevronLeft />],
        [RIGHT, <ChevronRight />],
    ])],
    [false, new Map([
        [LEFT, <ChevronRight />],
        [RIGHT, <ChevronLeft />],
    ])],
])

Toggle.propTypes = {
    open: PropTypes.bool.isRequired,
    side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    onClick: PropTypes.func.isRequired,
}

function Toggle({open = false, side = SIDE, onClick = K}) {
    return (
        <Button kind={SUBTILE} onClick={onClick} styleName='Toggle'>
            {ICONS.get(open).get(side)}
        </Button>
    )
}

export default CSSModules(Toggle, styles)
