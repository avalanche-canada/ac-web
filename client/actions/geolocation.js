import { createAction } from 'redux-actions'

export const GEOLOCATION_GET_POSITION = 'GEOLOCATION_GET_POSITION'
export const GEOLOCATION_POSITION_CHANGED = 'GEOLOCATION_POSITION_CHANGED'
export const GEOLOCATION_WATCH_POSITION_STOPPED =
    'GEOLOCATION_WATCH_POSITION_STOPPED'

let watcherId = null

const getPosition = createAction(GEOLOCATION_GET_POSITION)
const changePosition = createAction(GEOLOCATION_POSITION_CHANGED)

export const stop = createAction(
    GEOLOCATION_WATCH_POSITION_STOPPED,
    stopPayloadCreator
)

function stopPayloadCreator() {
    clearWatch()
}

export function locate(watch = false, options) {
    return dispatch => {
        const { geolocation } = navigator
        const onPositionResponse = position =>
            dispatch(changePosition(position))
        const onPositionError = error =>
            dispatch(changePosition(createError(error)))

        clearWatch()

        if (geolocation) {
            dispatch(getPosition())
            if (watch) {
                watcherId = geolocation.watchPosition(
                    onPositionResponse,
                    onPositionError,
                    options
                )
            } else {
                geolocation.getCurrentPosition(
                    onPositionResponse,
                    onPositionError,
                    options
                )
            }
        } else {
            const error = new Error({
                code: 0,
                message: 'Geolocation not supported.',
            })

            dispatch(getPosition(error))
        }
    }
}

const errorMessages = new Map([
    [1, 'Permission denied'],
    [2, 'Position unavailable'],
    [3, 'Timeout'],
    [undefined, 'Error'],
    [null, 'Error'],
])

function createError(error) {
    const { code, message } = error

    return new Error({
        code,
        message: `Geolocation error: ${errorMessages.get(message)}.`,
    })
}
function clearWatch() {
    const { geolocation } = navigator

    if (!geolocation || !geolocation.clearWatch || watcherId === null) {
        return
    }

    geolocation.clearWatch(watcherId)
    watcherId = null
}
