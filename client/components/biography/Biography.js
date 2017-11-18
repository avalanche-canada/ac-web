import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/avatar'
import { Mailto, Phone } from 'components/anchors'
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

export default function Biography({
    email,
    workPhoneNumber,
    children,
    fullName,
    title,
    avatar,
}) {
    return (
        <section className={styles.Container}>
            <div className={styles.Media}>
                <Avatar url={avatar} name={fullName} />
            </div>
            <div className={styles.Content}>
                <header className={styles.Header}>
                    <span className={styles.Name}>{fullName}</span>
                    {title && <span className={styles.Title}>{title}</span>}
                </header>
                <address className={styles.Address}>
                    {email && (
                        <Mailto
                            email={email}
                            title={`Send ${fullName} an email`}
                        />
                    )}
                    {workPhoneNumber && (
                        <Phone
                            phone={workPhoneNumber}
                            ext={null}
                            title={`Give ${fullName} a call`}
                        />
                    )}
                </address>
                {children}
            </div>
        </section>
    )
}
