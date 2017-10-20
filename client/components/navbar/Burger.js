import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import CSSModules from 'react-css-modules'
import { neverUpdate } from 'compose'
import { Menu } from 'components/icons'
import Button, { INCOGNITO } from '../button'
import styles from './Navbar.css'
import noop from 'lodash/noop'

Burger.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function Burger({ onClick = noop }) {
    return (
        <div styleName="Burger--Container">
            <Button kind={INCOGNITO} styleName="Burger" onClick={onClick}>
                <Menu width={32} height={32} />
            </Button>
        </div>
    )
}

export default compose(neverUpdate, CSSModules(styles))(Burger)
