import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { ForecastRegion, HotZone } from 'api/schemas'
import { getEntitiesForSchema } from 'getters/entities'
import { loadFeaturesMetadata as load } from 'actions/entities'
import { UnsupportedMap } from 'components/page'

const mapStateToProps = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZone),
    (regions, zones) => ({
        data: {
            forecastRegions: regions.sortBy(sorter).toList(),
            hotZones: zones.sortBy(sorter).toList(),
        },
    })
)

@connect(mapStateToProps, { load })
export default class UnsupportedMapContainer extends PureComponent {
    componentDidMount() {
        this.props.load()
    }
    render() {
        return <UnsupportedMap {...this.props.data} />
    }
}

function sorter(entity) {
    return entity.getIn(['properties', 'name'])
}
