import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import DateRange from './DateRange'
import ListOfValues from './ListOfValues'
import styles from './Layer.css'

function K() {}

FilterSet.propTypes = {
    filters: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired,
}

function FilterSet({filters = new Map(), onChange = K}) {
    return (
        <div styleName='FilterSet'>
            {[...filters].map(([name, {type, ...filter}]) => {
                const handleChange = onChange.bind(null, name)

                switch (type) {
                    case 'dateRange':
                        return <DateRange onChange={handleChange} {...filter} />
                    case 'listOfValues':
                        return <ListOfValues onChange={handleChange} {...filter} />
                    default:
                        throw new Error(`Filter of type ${type} not supported.`)
                }
            })}
        </div>
    )
}

export default CSSModules(FilterSet, styles)
