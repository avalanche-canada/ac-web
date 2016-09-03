import months from './months'

const predicates = new Map([
    ['year', ({year}) => post => post.year == year],
    ['month', ({month}) => post => post.month === months.indexOf(month) - 1],
    ['category', ({category}) => post => post.category == category],
    ['tags', ({tags}) => post => Boolean(post.tags.find(tag => tags.includes(tag)))],
])

const {keys} = Object

export default function getPredicates(query) {
    return keys(query).map(key => predicates.get(key).call(null, query))
}
