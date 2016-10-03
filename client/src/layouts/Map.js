import React, {PropTypes} from 'react'
import {compose, withContext} from 'recompose'
import {Primary, Secondary, Menu, OpenMenu} from 'containers/drawers'
import Map from 'containers/Map'

function Layout({primary}) {
    return (
        <div>
            <Map />
            <Primary>{primary}</Primary>
            <Secondary />
            <OpenMenu />
            <Menu />
        </div>
    )
}

export default compose(
    withContext({
        location: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
    }, ({location, routes, params}) => ({location, routes, params}))
)(Layout)
