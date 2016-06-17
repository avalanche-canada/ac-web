export function cursorTogglerFactory(...layers) {
    return function onMapMousemove(event) {
        const {target, point} = event
        const canvas = target.getCanvas()
        const features = target.queryRenderedFeatures(point, {layers})
        const cursor = features.length === 0 ? '' : 'pointer'

        canvas.style.cursor = cursor
    }
}
