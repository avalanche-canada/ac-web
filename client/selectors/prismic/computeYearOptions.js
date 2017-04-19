const YEAR = new Date().getFullYear()

function initial() {
    return new Map([
        [undefined, 'All years']
    ])
}
function reducer(years, year) {
    return years.set(year, String(year))
}

const DEFAULTS = Array(5).fill(null)
                         .map((value, index) => YEAR - index)
                         .reduce(reducer, initial())

export default function computeYearOptions(feed) {
    if (feed.isEmpty()) {
        return DEFAULTS
    } else {
        const set = feed.toSet().map(post => post.year).filter(year => !!year)

        return set.sort().reverse().reduce(reducer, initial())
    }
}
