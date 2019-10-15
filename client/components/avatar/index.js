import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { initials } from 'utils/string'
import { useBoolean } from 'hooks'
import styles from './Avatar.css'

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    size: PropTypes.number,
}

export default function Avatar({ size = 60, url, name }) {
    const [on, , unset] = useBoolean(Boolean(url))
    const style = {
        height: size,
        width: size,
        fontSize: size < 50 ? '0.75em' : '1em',
    }
    const className = classNames({
        Initials: on,
        Avatar: !on,
    })

    return (
        <div className={className} data-initials={initials(name)} style={style}>
            {url && (
                <img
                    src={url}
                    alt={initials(name)}
                    title={name}
                    onLoad={unset}
                    onError={unset}
                />
            )}
        </div>
    )
}

// Style
const classNames = classnames.bind(styles)
