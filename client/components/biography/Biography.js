import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Avatar from '~/components/avatar'
import { Mailto, Phone } from '~/components/anchors'
import styles from './Biography.css'

// FIXME: This component is asking for too much! Find a way to be more generic. Look at Blocquote.

Biography.propTypes = {
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string,
    workPhoneNumber: PropTypes.string,
    children: PropTypes.node,
}

function Biography({
    email,
    workPhoneNumber,
    children,
    fullName,
    title,
    avatar,
}) {
    return (
        <section styleName="Container">
            <div styleName="Media">
                <Avatar url={avatar} name={fullName} />
            </div>
            <div styleName="Content">
                <header styleName="Header">
                    <span styleName="Name">
                        {fullName}
                    </span>
                    {title &&
                        <span styleName="Title">
                            {title}
                        </span>}
                </header>
                <address styleName="Address">
                    {email &&
                        <Mailto
                            email={email}
                            title={`Send ${fullName} an email`}
                        />}
                    {workPhoneNumber &&
                        <Phone
                            phone={workPhoneNumber}
                            ext={null}
                            title={`Give ${fullName} a call`}
                        />}
                </address>
                {children}
            </div>
        </section>
    )
}

export default CSSModules(Biography, styles)
