import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import DateRange from './DateRange'
import ListOfValues from './ListOfValues'
import styles from './Layer.css'

const {keys} = Object

FilterSet.propTypes = {
    filters: PropTypes.object.isRequired,
}

function FilterSet({filters = {}}) {
    return (
        <div styleName='FilterSet'>
            {keys(filters).map(type => {
                switch (type) {
                    case 'dateRange':
                        return <DateRange {...filters[type]} />
                    case 'listOfValues':
                        return <ListOfValues {...filters[type]} />
                    default:
                        throw new Error(`Filter of type ${type} not suppoted.`)
                }
            })}
        </div>
    )
}

export default CSSModules(FilterSet, styles)
