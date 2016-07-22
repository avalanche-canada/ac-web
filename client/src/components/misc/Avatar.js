import React, {PropTypes} from 'react'
import { compose, setDisplayName } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Avatar.css'
import loadingState from './loadingState'
import {getInitials} from 'utils/string'

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
}

function Avatar({ url, name, onLoad, onError, isLoaded, hasError, isLoading }) {
    const initials = getInitials(name)
    const styleName = (hasError === true || isLoading === true) ? 'Initials' : 'Avatar'

    return (
        <div styleName={styleName} data-initials={initials}>
            <img src={url} alt={initials} title={name} onLoad={onLoad} onError={onError} />
        </div>
    )
}

export default compose(
    setDisplayName('Avatar'),
    loadingState,
)(CSSModules(Avatar, styles))
