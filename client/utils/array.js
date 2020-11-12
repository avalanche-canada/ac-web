export function range(start = 0, end, step = 1) {
    const length =
        end === undefined ? start : Math.ceil((end - start) / step) + 1
    const first = end === undefined ? 0 : start

    return Array(length)
        .fill(first)
        .map((value, index) => value + index * step)
}
