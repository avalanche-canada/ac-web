import React, { PropTypes, createElement } from 'react'
import { compose, setDisplayName } from 'recompose'
import words from 'lodash/words'
import CSSModules from 'react-css-modules'
import styles from './Avatar.css'
import loadingState from './loadingState'

function getInitials(name = null) {
    if (name === null) {
        return
    }

    const [first, second] = words(name)

    return ((first[0] || '') + (second[0] || '')).toUpperCase()
}

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
