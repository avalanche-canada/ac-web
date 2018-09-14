import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/controls'
import Button from 'components/button'
import styles from './Subscribe.css'

Subscribe.propTypes = {
    url: PropTypes.string.isRequired,
}

export default function Subscribe({ url }) {
    const params = new URLSearchParams(url)

    return (
        <form
            action={url}
            method="post"
            target="_blank"
            className={styles.Subscribe}>
            <Input
                type="email"
                name="EMAIL"
                placeholder="Email address"
                required
                className={styles.Input}
            />
            <Button type="submit" className={styles.Submit}>
                Subscribe
            </Button>
            {Array.from(params.entries()).map(([name, value]) => (
                <input key={name} name={name} type="hidden" value={value} />
            ))}
        </form>
    )
}
