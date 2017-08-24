import React from 'react'
import PropTypes from 'prop-types'
import { compose, onlyUpdateForKeys } from 'recompose'
import CSSModules from 'react-css-modules'
import Avatar from '~/components/avatar'
import styles from './Navbar.css'

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

function UserProfile({ name, avatar }) {
    return (
        <div styleName="UserProfile">
            <Avatar name={name} url={avatar} />
            <p>
                {name}
            </p>
        </div>
    )
}

export default compose(
    onlyUpdateForKeys(['name', 'avatar']),
    CSSModules(styles)
)(UserProfile)
