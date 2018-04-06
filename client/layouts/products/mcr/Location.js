import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Locate } from 'components/button'
import styles from './MountainConditionsReport.css'
import { InnerHTML } from 'components/misc'

export default class Location extends PureComponent {
    static propTypes = {
        onLocateClick: PropTypes.func.isRequired,
        description: PropTypes.string.isRequired,
    }
    render() {
        const { onLocateClick, description } = this.props

        return (
            <div className={styles.Location}>
                <InnerHTML className={styles.LocationDescription}>
                    {description}
                </InnerHTML>
                <Locate onClick={onLocateClick} />
            </div>
        )
    }
}
