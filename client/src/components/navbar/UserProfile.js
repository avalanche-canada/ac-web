import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import { Avatar } from '../misc'
import styles from './Navbar.css'

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

function UserProfile({ name, avatar }) {
    return (
        <div styleName='UserProfile'>
            <Avatar name={name} url={avatar} />
            <p>{name}</p>
        </div>
    )
}

export default CSSModules(UserProfile, styles)
