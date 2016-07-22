import React, {PropTypes} from 'react'
import {compose, withProps, mapProps, nest} from 'recompose'
import {connect} from 'react-redux'
import getLayers from 'selectors/menu'
import {toggleLayer, setFilter} from 'actions/drawers'
import {Header, Content} from 'components/page/drawer'
import {LayerSet, Layer} from 'components/page/drawer/layers'

Menu.propTypes = {
    layers: PropTypes.object.isRequired,
}

function Menu({sets = []}) {
    return (
        <div>
            <Header />
            <Content>
                {sets.map(({title, layers}) => (
                    <LayerSet title={title}>
                    {layers.map(({title, active, filters}, type) => (
                        <Layer key={type} {...{type, title, active, filters}} />
                    ))}
                    </LayerSet>
                ))}
            </Content>
        </div>
    )
}

export default compose(
    connect(getLayers, {
        toggleLayer,
        setFilter,
    }),
    mapProps(({layers}) => {
        const sets = layers.groupBy(layer => layer.type).map((layers, title) => {
            return {
                title,
                layers,
            }
        })

        return {
            sets
        }
    })
)(Menu)
