export function loadImage(url) {
    return new Promise((resolve, reject) => {
        Object.assign(new Image(), {
            src: url,
            onload: resolve,
            onerror: reject,
        })
    })
}
