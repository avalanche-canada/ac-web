import {getIsAuthenticated} from 'getters/auth'

export getForecast from './forecast'
export getTutorial from './tutorial'

export default function weather(state) {
    return {
        isAuthenticated: getIsAuthenticated(state)
    }
}
