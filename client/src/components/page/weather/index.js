import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'

Weather.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.number.isRequired,
}

function Weather({children, isAuthenticated}) {
    return (
        <div>
            {children}
            <Footer showFeedbackAnchor={isAuthenticated} />
        </div>
    )
}

export Sidebar from './Sidebar'
export Tutorial from './Tutorial'
export Forecast from './articles/Forecast'

export default Weather
