import React, {PropTypes} from 'react'
import {compose, withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Biography.css'
import {Image} from '../media'
import {Mailto, Phone, Avatar} from 'components/misc'

Biography.propTypes = {
    fullName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    email: PropTypes.string.isRequired,
    workPhoneNumber: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

function Biography({email, workPhoneNumber, children, fullName, title, avatar}) {
    return (
        <section styleName='Container'>
            <div styleName='Media'>
                <Avatar url={avatar} name={fullName} />
            </div>
            <div styleName='Content'>
                <header styleName='Header'>
                    <span styleName='Name'>{fullName}</span>
                    <span styleName='Title'>{title}</span>
                </header>
                <address styleName='Address'>
                    {email && <Mailto email={email} title={`Send ${fullName} an email`} />}
                    {workPhoneNumber && <Phone phone={workPhoneNumber} ext={null} title={`Give ${fullName} a call`} />}
                </address>
                {children}
            </div>
        </section>
    )
}

export default CSSModules(Biography, styles)
