export function DelayPromise(delay = 1) {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export function loadImage(url) {
    return new Promise((resolve, reject) => {
        Object.assign(document.createElement('img'), {
            src: url,
            onload: resolve,
            onerror: reject,
        })
    })
}
