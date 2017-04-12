const EMPTY = new Map([
    [undefined, 'All categories']
])

function computeCategoryOptions(feed) {
    if (feed.isEmpty()) {
        return EMPTY
    } else {
        function reducer(categories, category) {
            return categories.set(category, category)
        }

        const set = feed.toSet().map(entry => entry.category).filter(category => !!category)

        return set.sort().reduce(reducer, new Map([...EMPTY]))
    }
}

export default computeCategoryOptions
