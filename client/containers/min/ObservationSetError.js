import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import groupBy from 'lodash/groupBy'
import noop from 'lodash/noop'
import { NAMES } from 'constants/min'
import styles from './Form.css'
import { pluralize } from 'utils/string'

ObservationSetError.propTypes = {
    errors: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ),
    onErrorClick: PropTypes.func,
}

function ObservationSetError({ errors = [], onErrorClick = noop }) {
    const errorsPerType = groupBy(errors, err => err.path[1])
    const types = Object.keys(errorsPerType)
    const [type] = types

    if (types.length === 0) {
        return null
    }

    return (
        <div styleName="ObservationSetError">
            {type === 'undefined'
                ? 'Add information on one, some, or all tabs.'
                : <ul>
                      {types.filter(Boolean).map(type => {
                          const { length } = errorsPerType[type]

                          return (
                              <li key={type}>
                                  {pluralize('error', length, true)}
                                  {' '}
                                  found in your
                                  {' '}
                                  <a
                                      href="#"
                                      onClick={onErrorClick.bind(null, type)}>
                                      {NAMES.get(type)}
                                  </a>
                                  {' '}report
                              </li>
                          )
                      })}
                  </ul>}
        </div>
    )
}

export default CSSModules(ObservationSetError, styles)
