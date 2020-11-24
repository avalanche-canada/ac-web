import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import groupBy from 'lodash/groupBy'
import noop from 'lodash/noop'
import { useNames } from 'constants/min'
import styles from './Form.module.css'

ObservationSetError.propTypes = {
    errors: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ),
    onErrorClick: PropTypes.func,
}

export default function ObservationSetError({ errors = [], onErrorClick = noop }) {
    const names = useNames()
    const errorsPerType = groupBy(errors, err => err.path[1])
    const types = Object.keys(errorsPerType)
    const [type] = types

    if (types.length === 0) {
        return null
    }

    return (
        <div className={styles.ObservationSetError}>
            {type === 'undefined' ? (
                <FormattedMessage
                    description="Layout min/ObservationSetError"
                    defaultMessage="Add information on one, some, or all tabs."
                />
            ) : (
                <ul>
                    {types.filter(Boolean).map(type => {
                        const { length } = errorsPerType[type]
                        const handleClick = onErrorClick.bind(null, type)
                        const name = names.get(type)

                        return (
                            <li key={type}>
                                <FormattedMessage
                                    description="Layout min/ObservationSetError"
                                    defaultMessage="{count, plural, one {# error} other {# errors}} found in your <link></link> report."
                                    values={{
                                        count: length,
                                        link() {
                                            return (
                                                <a href="#" onClick={handleClick}>
                                                    {name}
                                                </a>
                                            )
                                        },
                                    }}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
