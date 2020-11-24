import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/avatar'
import { Mailto, Phone } from 'components/anchors'
import styles from './Biography.module.css'
import { useIntl } from 'react-intl'

// FIXME: This component is asking for too much! Find a way to be more generic. Look at Blocquote.

Biography.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
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
    firstName,
    lastName,
    title,
    avatar,
}) {
    const intl = useIntl()
    const fullName = `${firstName} ${lastName}`

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
                            title={intl.formatMessage({
                                description: 'Biography Component',
                                defaultMessage: 'Send {fullName} an email',
                                values: { fullName },
                            })}
                        />
                    )}
                    {workPhoneNumber && (
                        <Phone
                            phone={workPhoneNumber}
                            ext={null}
                            title={intl.formatMessage({
                                description: 'Biography Component',
                                defaultMessage: 'Give {fullName} a call',
                                values: { fullName },
                            })}
                        />
                    )}
                </address>
                {children}
            </div>
        </section>
    )
}
