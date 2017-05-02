const EMPTY = new Map([[undefined, 'All categories']])

export default function computeCategoryOptions(feed) {
    if (feed.isEmpty()) {
        return EMPTY
    } else {
        const reducer = (categories, category) =>
            categories.set(category, category)
        const set = feed.toSet().map(entry => entry.category).filter(Boolean)

        return set.sort().reduce(reducer, new Map([...EMPTY]))
    }
}
