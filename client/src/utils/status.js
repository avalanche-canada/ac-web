import Immutable from 'immutable'

const Status = Immutable.Record({
    isLoading: false,
    isLoaded: false,
    isError: false,
    messages: {},
}, 'Status')

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
    }
})

Object.assign(Status, {
    createFromResultSet({isFetching, ...rest}, messages = {}) {
        const status = new Status({
            ...rest,
            isLoading: isFetching
        })

        return status.set('messages', messages)
    }
})

export default Status
