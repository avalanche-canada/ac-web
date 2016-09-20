const VISIBILITY = new Map([
    [true, 'visible'],
    [false, 'none'],
])

export function setVisibility(layer, visible) {
    if (layer.layout.visibility === VISIBILITY.get(visible)) {
        return layer
    } else {
        return {
            ...layer,
            layout: {
                ...layer.layout,
                visibility: VISIBILITY.get(visible)
            }
        }
    }

}
