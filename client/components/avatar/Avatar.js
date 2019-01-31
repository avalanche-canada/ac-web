import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { initials } from 'utils/string'
import styles from './Avatar.css'

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    size: PropTypes.number,
}

function Avatar({ size = 60, url, name }) {
    const [on, set] = useState(Boolean(url))
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
                    onLoad={() => set(false)}
                    onError={() => set(false)}
                />
            )}
        </div>
    )
}

export default memo(Avatar)

// Style
const classNames = classnames.bind(styles)
