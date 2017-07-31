import * as search from './search'

export function assign(location = {}, override = {}) {
    return {
        ...location,
        ...override,
        search: search.stringify(
            search.assign(location.search, override.search)
        ),
        state: Object.assign({}, location.state, override.state),
    }
}
