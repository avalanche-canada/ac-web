export default function computeTagsOptions(feed) {
    // const initial = new Map([
    //     [undefined, 'No tags']
    // ])
    const initial = new Map()

    return feed.reduce((map, {tags}) => (
        tags.reduce((map, tag) => map.set(tag.toLowerCase(), tag), map)
    ), initial)
}
