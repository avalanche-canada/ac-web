import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/avatar'
import styles from './Navbar.css'

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

export default function UserProfile({ name, avatar }) {
    return (
        <div className={styles.UserProfile}>
            <Avatar name={name} url={avatar} />
            <p>{name}</p>
        </div>
    )
}
