import React from 'react'
import PropTypes from 'prop-types'
import Url from 'url'
import { Input } from 'components/controls'
import Button from 'components/button'
import styles from './Subscribe.css'

Subscribe.propTypes = {
    url: PropTypes.string.isRequired,
}

export default function Subscribe({ url }) {
    const { query } = Url.parse(url, true)

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
            {Object.keys(query).map(name => (
                <input
                    key={name}
                    name={name}
                    type="hidden"
                    value={query[name]}
                />
            ))}
        </form>
    )
}
