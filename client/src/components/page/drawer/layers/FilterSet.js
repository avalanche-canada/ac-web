import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import CSSModules from 'react-css-modules'
import DateRange from './DateRange'
import ListOfValues from './ListOfValues'
import styles from './Layer.css'

function K() {}
const MAP = new Immutable.Map()

FilterSet.propTypes = {
    filters: PropTypes.instanceOf(Immutable.Map).isRequired,
    onChange: PropTypes.func.isRequired,
}

function FilterSet({filters = MAP, onChange = K}) {
    return (
        <div styleName='FilterSet'>
            {filters.map((filter, name) => {
                const value = filter.get('value')
                const options = new Map(
                    filter.get('options').map((text, value) => [value, text]).toArray()
                )
                const handleChange = onChange.bind(null, name)

                switch (filter.get('type')) {
                    case 'dateRange':
                        return <DateRange key={name} onChange={handleChange} value={value} options={options} />
                    case 'listOfValues':
                        return <ListOfValues key={name} onChange={handleChange} value={value} options={options} />
                    default:
                        throw new Error(`Filter of type ${type} not supported.`)
                }
            })}
        </div>
    )
}

export default CSSModules(FilterSet, styles)
