import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'
import { Input } from 'components/controls'
import { Submit } from 'components/button'
import styles from './Subscribe.css'

Subscribe.propTypes = {
    url: PropTypes.string.isRequired,
}

export function Subscribe({ url }) {
    const params = new URLSearchParams(url)
    const intl = useIntl()
    const placeholder = intl.formatMessage({
        description: 'Services mailchimp',
        defaultMessage: 'Enter your email address',
    })

    return (
        <form
            action={url}
            method="post"
            target="_blank"
            className={styles.Subscribe}>
            <Input
                type="email"
                name="EMAIL"
                placeholder={placeholder}
                required
                className={styles.Input}
            />
            <Submit chevron="RIGHT">
                <FormattedMessage
                    description="Services mailchimp - Suibscribe component"
                    defaultMessage="Subscribe"
                />
            </Submit>
            {Array.from(params.entries(), ([name, value]) => (
                <input key={name} name={name} type="hidden" value={value} />
            ))}
        </form>
    )
}
