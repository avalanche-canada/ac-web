import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Biography.css'
import { Image } from '../media'
import Biography from './Biography'
import { Mailto, Phone } from '../misc'


Staff.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    ext: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

function Staff({ email, phone, ext, children, name, title, avatar }) {
    return (
        <Biography name={name} title={title} avatar={avatar} >
            {children}
            <address>
                <Mailto email={email} title={`Send ${name} an email`} />
                <br />
                <Phone phone={phone} ext={ext} title={`Give ${name} a call`} />
            </address>
        </Biography>
    )
}

export default CSSModules(Staff, styles)
