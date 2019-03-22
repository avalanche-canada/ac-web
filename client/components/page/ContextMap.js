import React from 'react'
import PropTypes from 'prop-types'
import { supported } from 'utils/mapbox'
import { Map, NavigationControl, ManagedStaticMap } from 'components/map'
import styles from './Page.css'

ContextMap.propTypes = {
    children: PropTypes.node,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
}

export default function ContextMap({ children, ...props }) {
    return (
        <div className={styles.ContextMap}>
            {supported() ? (
                <Map style="2016" {...props}>
                    <Map.With>{children}</Map.With>
                    <NavigationControl />
                </Map>
            ) : (
                <ManagedStaticMap retina tracked {...props}>
                    {children}
                </ManagedStaticMap>
            )}
        </div>
    )
}
