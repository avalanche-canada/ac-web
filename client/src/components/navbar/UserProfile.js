import React, { PropTypes } from 'react'
import Avatar from '../misc/Avatar'

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

export default function UserProfile({ name, avatar }) {
    return (
        <div>
            <Avatar name={name} url={avatar} />
            <p>{name}</p>
        </div>
    )
}
