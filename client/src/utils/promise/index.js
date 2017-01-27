export function DelayPromise(delay = 1) {
    return new Promise(resolve => setTimeout(resolve, delay))
}
