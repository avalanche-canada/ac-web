import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loadProviders } from 'actions/entities'
import Universal from 'components/Universal'
import { getEntitiesForSchema } from 'getters/entities'
import { getResultsSet } from 'getters/api'
import { Provider } from 'api/schemas'

export default connect(
    createStructuredSelector({
        providers(state, { tags }) {
            let providers = getEntitiesForSchema(state, Provider)

            if (tags) {
                providers = providers.filter(
                    provider =>
                        provider.get('isFeatured') ||
                        provider.get('tags').some(tag => tags.has(tag))
                )
            }

            // FIXME(KG): Bring back natural ordering, normalizr messes the sorting.
            return providers.sort(sorter)
        },
        status(state) {
            return getResultsSet(state, Provider, OPTIONS)
                .asStatus(MESSAGES)
                .toObject()
        },
    }),
    dispatch => ({
        didMount() {
            dispatch(loadProviders(OPTIONS))
        },
    })
)(Universal)

// Utils
const OPTIONS = {
    page_size: 1000,
}
const MESSAGES = {
    isLoading: 'Loading providers...',
    isError: 'An error happened while loading providers.',
}
function sorter(a, b) {
    return a
        .get('name')
        .localeCompare(b.get('name'), 'en', { sensitivity: 'base' })
}
