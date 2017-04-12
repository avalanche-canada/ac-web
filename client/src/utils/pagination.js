// Copied and modified from https://gist.github.com/kottenator/9d936eb3e4e3c3e02598

function pagination(current, total, delta = 2, fill = '...') {
    const left = current - delta
    const right = current + delta + 1
    const range = []
    const pages = []
    let l

    for (let i = 1; i <= total; i++) {
        if (i == 1 || i == total || i >= left && i < right) {
            range.push(i)
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                pages.push(l + 1)
            } else if (i - l !== 1) {
                pages.push(fill)
            }
        }
        pages.push(i)
        l = i
    }

    return pages
}

export default pagination
