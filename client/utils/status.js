import Immutable from 'immutable'
import PropTypes from 'prop-types'

export const propType = PropTypes.shape({
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    isError: PropTypes.bool,
    messages: PropTypes.object,
})

const Status = Immutable.Record(
    {
        isLoading: false,
        isLoaded: false,
        isError: false,
        messages: {},
    },
    'Status'
)

Object.assign(Status.prototype, {
    start() {
        return this.merge({
            isLoading: true,
            isLoaded: false,
            isError: false,
        })
    },
    fulfill() {
        return this.merge({
            isLoading: false,
            isLoaded: true,
        })
    },
    reject() {
        return this.merge({
            isLoading: false,
            isError: true,
        })
    },
})

Object.assign(Status, {
    createFromResultSet({ isFetching, isLoaded, isError }, messages = {}) {
        return new Status({
            isLoading: isFetching,
            isLoaded,
            isError,
            messages,
        })
    },
})

export default Status
