export function compose(...fns) {
    return x => fns.reduceRight((acc, fn) => fn(acc), x)
}

export function pipe(...fns) {
    return x => fns.reduce((acc, fn) => fn(acc), x)
}
