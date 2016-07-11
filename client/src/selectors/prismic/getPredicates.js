import months from './months'

const predicates = new Map([
    ['year', query => post => post.year == query.year],
    ['month', query => post => post.month === months.indexOf(query.month)],
    ['category', query => post => post.category == query.category],
    ['tags', query => post => post.tags.includes(query.tags)],
])

export default function getPredicates(query) {
    const keys = Object.keys(query)

    return keys.map(key => predicates.get(key).call(null, query))
}
