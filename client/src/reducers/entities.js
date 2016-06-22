// import merge from 'lodash/merge'

// TODO: Use immutable

export default function entities(state = { users: {}, repos: {} }, action) {
    return state

    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }
}
