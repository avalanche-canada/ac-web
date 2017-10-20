import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { compose } from 'recompose'
import CSSModules from 'react-css-modules'
import { onlyUpdateForKey } from 'compose'
import DateRange from './DateRange'
import { DropdownFromOptions } from 'components/controls'
import styles from './Layer.css'
import noop from 'lodash/noop'

const EMPTY = new Immutable.Map()

FilterSet.propTypes = {
    filters: PropTypes.instanceOf(Immutable.Map).isRequired,
    onChange: PropTypes.func.isRequired,
}

function FilterSet({ filters = EMPTY, onChange = noop }) {
    return (
        <div styleName="FilterSet">
            {filters.toList().map(({ value, type, name, options }) => {
                const props = {
                    key: name,
                    value,
                    onChange: onChange.bind(null, name),
                    options: new Map(
                        options.map((text, value) => [value, text]).toArray()
                    ),
                }

                switch (type) {
                    case 'dateRange':
                        return <DateRange {...props} />
                    case 'listOfValues':
                        return <DropdownFromOptions {...props} />
                    default:
                        throw new Error(`Filter of type ${type} not supported.`)
                }
            })}
        </div>
    )
}

export default compose(onlyUpdateForKey('filters'), CSSModules(styles))(
    FilterSet
)
