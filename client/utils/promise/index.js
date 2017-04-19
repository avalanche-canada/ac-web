export function DelayPromise(delay = 1) {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export function loadImage(url) {
    return new Promise((resolve, reject) => {
        Object.assign(new Image(), {
            src: url,
            onload: resolve,
            onerror: reject,
        })
    })
}
