import Immutable from 'immutable'
import Status from '~/utils/status'

export const Result = Immutable.Record({
    isFetching: false,
    isLoaded: false,
    isError: false,
    ids: new Set(),
    count: null,
    next: null,
    previous: null,
    // TODO: Look if this is used!!!
    props: {},
})

Object.assign(Result.prototype, {
    start(props = {}) {
        return this.merge({
            ...props,
            isFetching: true,
            isLoaded: false,
            isError: false,
        })
    },
    fulfill(props = {}) {
        return this.merge({
            ...props,
            isFetching: false,
            isLoaded: true,
        })
    },
    reject() {
        return this.merge({
            isFetching: false,
            isError: true,
        })
    },
    asStatus(messages = {}) {
        return new Status({
            isLoading: this.isFetching,
            isLoaded: this.isLoaded,
            isError: this.isError,
            messages,
        })
    },
})

export default new Result()
