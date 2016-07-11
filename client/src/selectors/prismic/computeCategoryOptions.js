function initial() {
    return new Map([
        [undefined, 'All categories']
    ])
}
const EMPTY = initial()
export default function computeCategoryOptions(feed) {
    if (feed.isEmpty()) {
        return EMPTY
    } else {
        function reducer(categories, category) {
            return categories.set(category, category)
        }

        const set = feed.toSet().map(entry => entry.category).filter(category => !!category)

        return set.sort().reduce(reducer, initial())
    }
}
