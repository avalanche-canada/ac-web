import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Toggle } from 'react-powerplug'
import { initials } from 'utils/string'
import styles from './Avatar.css'

// TODO: HOOKS

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    size: PropTypes.number,
}

function Avatar({ size = 60, url, name }) {
    const style = {
        height: size,
        width: size,
        fontSize: size < 50 ? '0.75em' : '1em',
    }

    return (
        <Toggle initial={Boolean(url)}>
            {({ on, set }) => {
                const className = classNames({
                    Initials: on,
                    Avatar: !on,
                })

                return (
                    <div
                        className={className}
                        data-initials={initials(name)}
                        style={style}>
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
            }}
        </Toggle>
    )
}

export default memo(Avatar)

// Style
const classNames = classnames.bind(styles)
