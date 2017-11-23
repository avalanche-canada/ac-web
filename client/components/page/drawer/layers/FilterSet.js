import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import DateRange from './DateRange'
import { DropdownFromOptions } from 'components/controls'
import styles from './Layer.css'

export default class FilterSet extends PureComponent {
    static propTypes = {
        filters: PropTypes.instanceOf(Immutable.Map).isRequired,
        onChange: PropTypes.func.isRequired,
    }
    renderFilter = ({ value, type, name, options }) => {
        const props = {
            key: name,
            value,
            onChange: this.props.onChange.bind(null, name),
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
    }
    render() {
        return (
            <div className={styles.FilterSet}>
                {this.props.filters.toList().map(this.renderFilter)}
            </div>
        )
    }
}
