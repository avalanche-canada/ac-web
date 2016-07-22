import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import SIDE, {LEFT, RIGHT} from './constants/sides'
import Toggle from './Toggle'

function getDrawerStyle(position, width) {
    return {
        transform: `translateX(${position * 100}%)`,
        width,
    }
}

const STYLE_NAMES = new Map([
    [LEFT, 'Drawer--Left'],
    [RIGHT, 'Drawer--Right'],
])

Drawer.propTypes = {
    side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    open: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number,
    header: PropTypes.element,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}

function Drawer({side = SIDE, open, position, width, onOpen, onClose, children}) {
    let styleName = STYLE_NAMES.get(side)

    if (open) {
        styleName += ' Open'
    }

    return (
        <div style={getDrawerStyle(position, width)} styleName={styleName}>
            <Toggle {...{side, open}} onOpen={onOpen} onClose={onClose} />
            {children}
        </div>
    )
}

export default CSSModules(Drawer, styles, {allowMultiple: true})
