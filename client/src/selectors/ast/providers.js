import React from 'react'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import {Provider} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {Phone, Mailto} from 'components/misc'
import {HeaderCellOrders} from 'components/table'

const {ASC, DESC, NONE} = HeaderCellOrders
const COLUMNS = [{
    title: 'Provider Name',
    property: 'name',
}, {
    title: 'Email',
    property({email}) {
        return (
            <Mailto email={email} />
        )
    },
}, {
    title: 'Phone',
    property({phone}) {
        return (
            <Phone phone={phone} />
        )
    }
}, {
    title: 'Website',
    property({website}) {
        return (
            <a href={website} target='_blank'>{website}</a>
        )
    }
}, {
    title: 'Location',
    property: 'location',
}]

const RESULTS = {
    ids: new Set(),
    isLoading: false,
    isLoaded: false,
    isError: false,
}

const Sorters = new Map([
    ['name', course => course.name],
    ['contact', course => course.contact],
])

function getProviderEntities(state) {
    return getEntitiesForSchema(state, Provider)
}

function getProvidersResultSet(state, {location}) {
    const {query} = location

    return getResultsSet(state, Provider, query) || RESULTS
}

function isSponsor(provider) {
    return provider.isSponsor
}

const getProviders = createSelector(
    getProviderEntities,
    providers => providers.toList()
)

export default createSelector(
    getProvidersResultSet,
    getProviders,
    function mapStateToProps(result, providers) {
        return {
            ...result,
            title: 'All providers',
            legend: 'Find a provider',
            columns: COLUMNS,
            featured: providers.filter(isSponsor).toJSON(),
            rows: providers.filterNot(isSponsor).toJSON(),
        }
    }
)
